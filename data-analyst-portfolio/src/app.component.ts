import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  QueryList,
  ViewChildren,
  inject,
  computed,
  PLATFORM_ID,
  Renderer2,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, of } from 'rxjs';
import { 
  Project, 
  Experience, 
  initialTechProficiencies,
  initialProjects,
  initialExperiences,
  initialCertifications,
  initialHeadlineParts
} from './app.data';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(keydown.escape)': 'onEscapeKey()',
  },
})
export class AppComponent implements AfterViewInit, OnInit {
  private fb: FormBuilder;
  private http: HttpClient;
  private renderer: Renderer2;
  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  @ViewChild('chartContainer') chartContainerRef!: ElementRef<HTMLElement>;
  @ViewChildren('animateInView') animateInViewElements!: QueryList<ElementRef<HTMLElement>>;

  isChartVisible = signal(false);
  mobileNavOpen = signal(false);
  showBackToTop = signal(false);
  formStatus = signal<{ state: 'idle' | 'submitting' | 'success' | 'error'; message: string }>({ state: 'idle', message: '' });
  selectedProject = signal<Project | null>(null);
  lightboxImageUrl = signal<string | null>(null);
  currentYear = signal(2024); // Use a static default
  
  showAddProjectModal = signal(false);
  showAddExperienceModal = signal(false);

  contactForm: FormGroup;
  newProjectForm: FormGroup;
  newExperienceForm: FormGroup;

  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.renderer = inject(Renderer2);
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.newProjectForm = this.fb.group({
      title: ['', Validators.required],
      imgSrc: ['', Validators.required],
      tags: ['', Validators.required],
      problem: ['', Validators.required],
      process: ['', Validators.required],
      outcome: ['', Validators.required],
    });

     this.newExperienceForm = this.fb.group({
      role: ['', Validators.required],
      company: ['', Validators.required],
      date: ['', Validators.required],
      points: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    if (this.isBrowser) {
      this.currentYear.set(new Date().getFullYear());
    }
  }

  // Data for sections
  techProficiencies = initialTechProficiencies;
  projects = signal<Project[]>(initialProjects);
  experiences = signal<Experience[]>(initialExperiences);
  certifications = initialCertifications;

  // Headline Animation
  private headlineParts = signal(initialHeadlineParts);

  animatedHeadline = computed(() => {
    let charIndex = 0;
    return this.headlineParts().map(line =>
      line.flatMap(part =>
        part.text.split('').map(char => ({
          char,
          class: part.class,
          delay: `${charIndex++ * 0.05}s`
        }))
      )
    );
  });
  
  fullHeadlineText = computed(() => this.headlineParts().map(line => line.map(p => p.text).join('')).join(' '));

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.chartContainerRef && entry.target === this.chartContainerRef.nativeElement) {
            this.isChartVisible.set(true);
          }
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.chartContainerRef) {
      this.observer.observe(this.chartContainerRef.nativeElement);
    }
    this.animateInViewElements.forEach((el) => {
      this.observer?.observe(el.nativeElement);
    });
  }
  
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showBackToTop.set(scrollY > 300);
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update(open => !open);
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileNavOpen.set(false);
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.formStatus.set({ state: 'submitting', message: 'Sending message...' });
    
    const formData = new FormData();
    formData.append('access_key', '80a79afb-a8a2-4019-bf5a-1ae193d9df08'); // Replace with your key
    Object.keys(this.contactForm.value).forEach(key => {
      const value = this.contactForm.value[key as keyof typeof this.contactForm.value];
      formData.append(key, value || '');
    });

    this.http.post('https://api.web3forms.com/submit', formData)
      .pipe(
        tap(() => {
          this.formStatus.set({ state: 'success', message: 'Message sent successfully!' });
          this.contactForm.reset();
        }),
        catchError(() => {
          this.formStatus.set({ state: 'error', message: 'Something went wrong. Please try again.' });
          return of(null);
        })
      ).subscribe();
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    if (this.isBrowser) {
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
    this.closeImageLightbox();
     if (this.isBrowser) {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  openImageLightbox(imageUrl: string): void {
    this.lightboxImageUrl.set(imageUrl);
  }

  closeImageLightbox(): void {
    this.lightboxImageUrl.set(null);
  }

  openAddProjectModal(): void {
    this.showAddProjectModal.set(true);
    if (this.isBrowser) this.renderer.addClass(document.body, 'modal-open');
  }

  closeAddProjectModal(): void {
    this.showAddProjectModal.set(false);
    if (this.isBrowser) this.renderer.removeClass(document.body, 'modal-open');
  }

  onAddProject(): void {
    if (this.newProjectForm.invalid) {
      return;
    }
    const formValue = this.newProjectForm.value;
    const newProject: Project = {
      title: formValue.title,
      imgSrc: formValue.imgSrc,
      tags: formValue.tags.split(',').map((tag: string) => tag.trim()),
      caseStudy: {
        problem: formValue.problem,
        process: formValue.process,
        outcome: formValue.outcome,
      },
    };

    this.projects.update(projects => [...projects, newProject]);
    this.newProjectForm.reset();
    this.closeAddProjectModal();
  }

  openAddExperienceModal(): void {
    this.showAddExperienceModal.set(true);
    if (this.isBrowser) this.renderer.addClass(document.body, 'modal-open');
  }

  closeAddExperienceModal(): void {
    this.showAddExperienceModal.set(false);
    if (this.isBrowser) this.renderer.removeClass(document.body, 'modal-open');
  }

  onAddExperience(): void {
    if (this.newExperienceForm.invalid) {
      return;
    }
    const formValue = this.newExperienceForm.value;
    const lastExperience = this.experiences()[this.experiences().length - 1];
    const newAlignment = lastExperience?.align === 'left' ? 'right' : 'left';

    const newExperience: Experience = {
      role: formValue.role,
      company: formValue.company,
      date: formValue.date,
      points: formValue.points.split('\n').map((p: string) => p.trim()).filter((p: string) => p),
      align: newAlignment
    };

    this.experiences.update(experiences => [...experiences, newExperience]);
    this.newExperienceForm.reset();
    this.closeAddExperienceModal();
  }

  onEscapeKey(): void {
    if (this.lightboxImageUrl()) {
      this.closeImageLightbox();
    } else if (this.selectedProject()) {
      this.closeProjectModal();
    } else if (this.showAddProjectModal()) {
      this.closeAddProjectModal();
    } else if (this.showAddExperienceModal()) {
      this.closeAddExperienceModal();
    }
  }
}
