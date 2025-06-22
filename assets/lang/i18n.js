/**
 * Internationalization (i18n) Module
 * Handles language switching between English and Traditional Chinese
 */

class I18n {
  constructor() {
    this.currentLanguage = 'en';
    this.languages = {
      'en': 'English',
      'zh-TW': '繁體中文'
    };
    this.translations = {};
    this.isLoading = false;
    
    // Initialize
    this.init();
  }

  async init() {
    // Detect initial language
    this.currentLanguage = this.detectLanguage();
    
    // Load translations
    await this.loadTranslations();
    
    // Apply initial language
    this.applyLanguage();
    
    // Setup language toggle
    this.setupLanguageToggle();
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }

  detectLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.languages[savedLang]) {
      return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
      return 'zh-TW';
    }
    
    // Default to English
    return 'en';
  }

  async loadTranslations() {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      // Load both language files
      const [enResponse, zhResponse] = await Promise.all([
        fetch('assets/lang/en.json'),
        fetch('assets/lang/zh-TW.json')
      ]);

      if (!enResponse.ok || !zhResponse.ok) {
        throw new Error('Failed to load language files');
      }

      this.translations.en = await enResponse.json();
      this.translations['zh-TW'] = await zhResponse.json();
      
      console.log('Translations loaded successfully');
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English if loading fails
      this.currentLanguage = 'en';
    } finally {
      this.isLoading = false;
    }
  }

  setupLanguageToggle() {
    // Create language toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'language-toggle';
    toggleButton.className = 'language-toggle';
    toggleButton.setAttribute('aria-label', 'Switch Language');
    
    // Add to body (will be positioned fixed in top-right corner via CSS)
    document.body.appendChild(toggleButton);
    
    // Add click event
    toggleButton.addEventListener('click', () => {
      console.log('Language toggle clicked');
      this.toggleLanguage();
    });
    
    // Update button text
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggleButton = document.querySelector('#language-toggle');
    if (toggleButton) {
      toggleButton.textContent = this.currentLanguage === 'en' ? '中' : 'EN';
      toggleButton.title = this.currentLanguage === 'en' ? 'Switch to Chinese' : 'Switch to English';
    }
  }

  async toggleLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'zh-TW' : 'en';
    await this.switchLanguage(newLanguage);
  }

  async switchLanguage(language) {
    if (language === this.currentLanguage || !this.languages[language]) {
      return;
    }

    // Show loading state
    document.body.classList.add('language-switching');
    
    try {
      this.currentLanguage = language;
      
      // Save preference
      localStorage.setItem('preferred-language', language);
      
      // Update HTML lang attribute
      document.documentElement.lang = language;
      
      // Apply new language
      this.applyLanguage();
      
      // Update toggle button
      this.updateToggleButton();
      
      console.log(`Language switched to: ${this.languages[language]}`);
    } catch (error) {
      console.error('Error switching language:', error);
    } finally {
      // Remove loading state
      setTimeout(() => {
        document.body.classList.remove('language-switching');
      }, 300);
    }
  }

  applyLanguage() {
    const translations = this.translations[this.currentLanguage];
    if (!translations) {
      console.error(`Translations not found for language: ${this.currentLanguage}`);
      return;
    }

    // Update meta tags
    this.updateMetaTags(translations.meta);
    
    // Update navigation
    this.updateNavigation(translations.header.nav);
    
    // Update hero section
    this.updateHeroSection(translations.hero);
    
    // Update about section
    this.updateAboutSection(translations.about);
    
    // Update skills section
    this.updateSkillsSection(translations.skills);
    
    // Update resume section
    this.updateResumeSection(translations.resume);
    
    // Update portfolio section
    this.updatePortfolioSection(translations.portfolio);
    
    // Update contact section
    this.updateContactSection(translations.contact);
    
    // Update footer
    this.updateFooter(translations.footer);
    
    // Reinitialize typed.js with new content
    this.reinitializeTyped(translations.hero.typed_items);
  }

  updateMetaTags(meta) {
    document.title = meta.title;
    
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = meta.description;
    
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) keywords.content = meta.keywords;
  }

  updateNavigation(nav) {
    const navItems = {
      'a[href="#hero"]': nav.home,
      'a[href="#about"]': nav.about,
      'a[href="#skills"]': nav.skills,
      'a[href="#resume"]': nav.resume,
      'a[href="#portfolio"]': nav.portfolio,
      'a[href="#contact"]': nav.contact
    };

    Object.entries(navItems).forEach(([selector, text]) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = text;
        }
      });
    });
  }

  updateHeroSection(hero) {
    this.updateTextContent('h1', hero.name);
    this.updateTextContent('.hero-text h2', hero.title);
    this.updateTextContent('.hero-text .description', hero.description);
    this.updateTextContent('.btn-primary', hero.cta_primary);
    this.updateTextContent('.btn-outline', hero.cta_secondary);
  }

  updateAboutSection(about) {
    this.updateTextContent('.about .badge-text', about.badge);
    this.updateTextContent('.about .section-header h2', about.title);
    this.updateTextContent('.about .profession', about.profession);
    
    const descriptions = document.querySelectorAll('.about .description p');
    if (descriptions.length >= 2) {
      descriptions[0].textContent = about.description_1;
      descriptions[1].textContent = about.description_2;
    }
    
    // Update detail items
    const detailItems = document.querySelectorAll('.detail-item');
    const detailData = [
      [about.details.specialization_label, about.details.specialization_value],
      [about.details.experience_label, about.details.experience_value],
      [about.details.background_label, about.details.background_value],
      [about.details.languages_label, about.details.languages_value]
    ];
    
    detailItems.forEach((item, index) => {
      if (detailData[index]) {
        const label = item.querySelector('.detail-label');
        const value = item.querySelector('.detail-value');
        if (label) label.textContent = detailData[index][0];
        if (value) value.textContent = detailData[index][1];
      }
    });
    
    // Update CTA buttons
    this.updateTextContent('.about .btn-primary', about.cta_resume);
    this.updateTextContent('.about .btn-outline', about.cta_talk);
  }

  updateSkillsSection(skills) {
    this.updateTextContent('.skills .section-title h2', skills.title);
    this.updateTextContent('.skills .section-title p', skills.subtitle);
    
    // Update skill categories - more comprehensive approach
    const categories = document.querySelectorAll('.skills-category');
    
    // Map categories to their keys in order they appear in HTML
    const categoryMappings = [
      { key: 'backend', itemKeys: ['dotnet', 'sqlserver', 'api', 'mvc'] },
      { key: 'database', itemKeys: ['mssql', 'postgres', 'design', 'queries'] },
      { key: 'ai_tools', itemKeys: ['mcp', 'agents', 'llm', 'debugging'] },
      { key: 'environment', itemKeys: ['vscode', 'vim', 'linux', 'cli'] },
      { key: 'supporting', itemKeys: ['javascript', 'html_css', 'vue', 'professional'] }
    ];
    
    categories.forEach((category, index) => {
      const mapping = categoryMappings[index];
      if (mapping && skills.categories[mapping.key]) {
        const categoryData = skills.categories[mapping.key];
        
        // Update category title
        const title = category.querySelector('h3');
        if (title) title.textContent = categoryData.title;
        
        // Update skill items
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach((item, itemIndex) => {
          const itemKey = mapping.itemKeys[itemIndex];
          if (itemKey && categoryData.items[itemKey]) {
            const skillData = categoryData.items[itemKey];
            const nameEl = item.querySelector('h4');
            const descEl = item.querySelector('p');
            if (nameEl) nameEl.textContent = skillData.name;
            if (descEl) descEl.textContent = skillData.description;
          }
        });
      }
    });
  }

  updateResumeSection(resume) {
    this.updateTextContent('.resume .section-title h2', resume.title);
    this.updateTextContent('.resume .section-title p', resume.subtitle);
    
    // Update summary
    this.updateTextContent('.resume-side h3', resume.summary.title);
    this.updateTextContent('.resume-side p', resume.summary.content);
    
    // Update contact info title
    const contactTitle = document.querySelector('.resume-side h3:nth-of-type(2)');
    if (contactTitle) contactTitle.textContent = resume.contact_info.title;
    
    // Update competencies title
    const competenciesTitle = document.querySelector('.resume-side h3:nth-of-type(3)');
    if (competenciesTitle) competenciesTitle.textContent = resume.competencies.title;
    
    // Update experience section
    this.updateTextContent('.resume-section h3', resume.experience.title);
    
    // Update job details
    if (resume.experience && resume.experience.jobs) {
      const resumeItems = document.querySelectorAll('.resume-item');
      const jobKeys = ['procurement', 'fms', 'logistics'];
      
      resumeItems.forEach((item, index) => {
        const jobKey = jobKeys[index];
        if (resume.experience.jobs[jobKey]) {
          const job = resume.experience.jobs[jobKey];
          
          // Update job title
          const titleEl = item.querySelector('h4');
          if (titleEl) titleEl.textContent = job.title;
          
          // Update duration
          const durationEl = item.querySelector('h5');
          if (durationEl) durationEl.textContent = job.duration;
          
          // Update company
          const companyEl = item.querySelector('.company');
          if (companyEl) {
            const icon = companyEl.querySelector('i');
            companyEl.innerHTML = '';
            if (icon) companyEl.appendChild(icon);
            companyEl.appendChild(document.createTextNode(' ' + job.company));
          }
          
          // Update responsibilities
          const responsibilitiesList = item.querySelector('ul');
          if (responsibilitiesList && job.responsibilities) {
            responsibilitiesList.innerHTML = '';
            job.responsibilities.forEach(responsibility => {
              const li = document.createElement('li');
              li.textContent = responsibility;
              responsibilitiesList.appendChild(li);
            });
          }
        }
      });
    }
    
    // Update education section
    if (resume.education) {
      const educationSection = document.querySelectorAll('.resume-section')[1];
      if (educationSection) {
        const educationTitle = educationSection.querySelector('h3');
        if (educationTitle) educationTitle.textContent = resume.education.title;
        
        const educationItems = educationSection.querySelectorAll('.resume-item');
        const educationKeys = ['self_learning', 'military'];
        
        educationItems.forEach((item, index) => {
          const eduKey = educationKeys[index];
          if (resume.education.items[eduKey]) {
            const edu = resume.education.items[eduKey];
            
            const titleEl = item.querySelector('h4');
            if (titleEl) titleEl.textContent = edu.title;
            
            const durationEl = item.querySelector('h5');
            if (durationEl) durationEl.textContent = edu.duration;
            
            const institutionEl = item.querySelector('.company');
            if (institutionEl) {
              const icon = institutionEl.querySelector('i');
              institutionEl.innerHTML = '';
              if (icon) institutionEl.appendChild(icon);
              institutionEl.appendChild(document.createTextNode(' ' + edu.institution));
            }
            
            if (edu.description) {
              const descEl = item.querySelector('p');
              if (descEl) descEl.textContent = edu.description;
            }
            
            if (edu.items) {
              const itemsList = item.querySelector('ul');
              if (itemsList) {
                itemsList.innerHTML = '';
                edu.items.forEach(eduItem => {
                  const li = document.createElement('li');
                  li.textContent = eduItem;
                  itemsList.appendChild(li);
                });
              }
            }
          }
        });
      }
    }
    
    // Update awards section
    if (resume.awards) {
      const awardsSection = document.querySelectorAll('.resume-section')[2];
      if (awardsSection) {
        const awardsTitle = awardsSection.querySelector('h3');
        if (awardsTitle) awardsTitle.textContent = resume.awards.title;
        
        const awardItems = awardsSection.querySelectorAll('.resume-item');
        const awardKeys = ['distinguished', 'loyalty'];
        
        awardItems.forEach((item, index) => {
          const awardKey = awardKeys[index];
          if (resume.awards.items[awardKey]) {
            const award = resume.awards.items[awardKey];
            
            const titleEl = item.querySelector('h4');
            if (titleEl) titleEl.textContent = award.title;
            
            const yearEl = item.querySelector('h5');
            if (yearEl) yearEl.textContent = award.year;
            
            const descEl = item.querySelector('p');
            if (descEl) descEl.textContent = award.description;
          }
        });
      }
    }
  }

  updatePortfolioSection(portfolio) {
    this.updateTextContent('.portfolio .section-title h2', portfolio.title);
    this.updateTextContent('.portfolio .section-title p', portfolio.subtitle);
  }

  updateContactSection(contact) {
    this.updateTextContent('.contact .section-title h2', contact.title);
    this.updateTextContent('.contact .section-title p', contact.subtitle);
    
    this.updateTextContent('.info-box h3', contact.info.title);
    this.updateTextContent('.info-box p', contact.info.description);
    
    // Update contact form
    this.updateTextContent('.contact-form h3', contact.form.title);
    this.updateTextContent('.contact-form p', contact.form.description);
    
    // Update form placeholders
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const subjectInput = document.querySelector('input[name="subject"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    
    if (nameInput) nameInput.placeholder = contact.form.placeholders.name;
    if (emailInput) emailInput.placeholder = contact.form.placeholders.email;
    if (subjectInput) subjectInput.placeholder = contact.form.placeholders.subject;
    if (messageTextarea) messageTextarea.placeholder = contact.form.placeholders.message;
    
    this.updateTextContent('.contact-form button[type="submit"]', contact.form.button);
  }

  updateFooter(footer) {
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
      copyrightEl.innerHTML = `© <span>${footer.copyright}</span> <strong class="px-1 sitename">Tabby Boots</strong> <span>${footer.rights}</span>`;
    }
    
    const creditsEl = document.querySelector('.credits');
    if (creditsEl) {
      creditsEl.innerHTML = `${footer.credits} <i class="bi bi-heart-fill text-danger"></i> ${footer.template}`;
    }
  }

  reinitializeTyped(typedItems) {
    // Destroy existing typed instance
    const typedElement = document.querySelector('.typed');
    if (typedElement && typedElement.typed) {
      typedElement.typed.destroy();
    }
    
    // Reinitialize with new content
    if (typedElement && window.Typed) {
      const items = typedItems.split(',').map(item => item.trim());
      new Typed('.typed', {
        strings: items,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  updateTextContent(selector, text) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) el.textContent = text;
    });
  }

  // Public method to get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Public method to get available languages
  getAvailableLanguages() {
    return this.languages;
  }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}
