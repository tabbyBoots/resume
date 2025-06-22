# Meng Hsun, Lee - Backend Developer Portfolio

A professional portfolio website showcasing my journey from military service to software development, built with modern web technologies and featuring bilingual support (English/Chinese Traditional).

## 🌟 Live Demo

**Portfolio Website:** [https://tabbyboots.bloomski.com](https://tabbyboots.bloomski.com)

## 📋 About This Project

This is a responsive, single-page portfolio website that presents my professional background, technical skills, and software development projects. The site demonstrates my transition from 20+ years of military logistics and procurement experience to backend development specializing in .NET Core C# MVC.

## 🚀 Features

### Core Features
- **Responsive Design** - Optimized for all devices and screen sizes
- **Bilingual Support** - English and Chinese Traditional with dynamic language switching
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Single Page Application** - Seamless navigation between sections
- **Contact Form Integration** - EmailJS integration for direct messaging
- **Portfolio Showcase** - Interactive project gallery with detailed descriptions

### Technical Features
- **Standalone HTML** - Self-contained with embedded translations and scripts
- **CSS Animations** - AOS (Animate On Scroll) library integration
- **Typed.js Integration** - Dynamic text animation for hero section
- **Bootstrap 5** - Modern responsive framework
- **Font Awesome Icons** - Professional iconography
- **Lightbox Gallery** - GLightbox for portfolio image viewing
- **Form Validation** - Client-side form validation and feedback

## 🛠️ Technologies Used

### Frontend Stack
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with modern features
- **JavaScript (ES6+)** - Interactive functionality and language switching
- **Bootstrap 5.3.6** - Responsive grid system and components

### Libraries & Frameworks
- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Typed.js** - Text typing animation effects
- **GLightbox** - Modern lightbox for images
- **Swiper.js** - Touch slider functionality
- **Bootstrap Icons** - Comprehensive icon library

### External Services
- **EmailJS** - Contact form email delivery
- **Google Fonts** - Typography (Roboto, Ubuntu, Nunito)
- **CDN Integration** - Fast loading of external resources

## 📁 Project Structure

```
pillar-theme/
├── index-standalone.html          # Main portfolio page (standalone)
├── index.html                     # Alternative main page
├── README.md                      # Project documentation
├── .gitignore                     # Git ignore rules
├── EMAILJS_SETUP.md              # EmailJS configuration guide
├── assets/
│   ├── css/
│   │   ├── snapfolio.css         # Main stylesheet
│   │   ├── pillar-1.css          # Color scheme 1
│   │   ├── pillar-2.css          # Color scheme 2
│   │   ├── pillar-3.css          # Color scheme 3
│   │   ├── pillar-4.css          # Color scheme 4
│   │   ├── pillar-5.css          # Color scheme 5
│   │   ├── pillar-6.css          # Color scheme 6
│   │   └── style.css             # Additional styles
│   ├── js/
│   │   └── snapfolio.js          # Main JavaScript functionality
│   ├── images/
│   │   ├── profile-2.webp        # Hero section profile image
│   │   ├── profile-square-3.webp # About section profile image
│   │   ├── project-1.jpg         # Portfolio project image
│   │   ├── project-2.jpg         # Portfolio project image
│   │   └── project-3.jpg         # Portfolio project image
│   ├── lang/
│   │   ├── en.json               # English translations
│   │   ├── zh-TW.json            # Chinese Traditional translations
│   │   └── i18n.js               # Internationalization script
│   ├── scss/                     # SASS source files
│   └── fontawesome/              # Font Awesome icon library
└── memory-bank/                  # Development documentation
```

## 🎨 Design Features

### Color Schemes
The project includes 6 different color schemes:
- **Pillar 1** - Default professional blue theme
- **Pillar 2** - Alternative color variation
- **Pillar 3** - Modern accent colors
- **Pillar 4** - Warm professional tones
- **Pillar 5** - Contemporary color palette
- **Pillar 6** - Elegant dark theme

### Responsive Breakpoints
- **Mobile First** - Optimized for mobile devices
- **Tablet** - Enhanced layout for medium screens
- **Desktop** - Full-featured desktop experience
- **Large Screens** - Optimized for high-resolution displays

## 🌐 Internationalization

### Language Support
- **English (en)** - Primary language
- **Chinese Traditional (zh-TW)** - Secondary language

### Features
- **Dynamic Language Switching** - Toggle button for instant language change
- **Browser Language Detection** - Automatic language selection based on browser settings
- **Persistent Language Preference** - Remembers user's language choice
- **Complete Translation Coverage** - All content translated including meta tags

## 📱 Sections Overview

### 1. Hero Section
- Professional introduction with animated typing effect
- Call-to-action buttons for portfolio and contact
- Social media links (LinkedIn, GitHub, Website, Email)
- Floating technical icons animation

### 2. About Section
- Professional background and career transition story
- Contact information and key details
- Professional summary and specialization
- Call-to-action buttons for resume and contact

### 3. Skills Section
- **Core Backend Stack** - .NET Core C# MVC, SQL Server, APIs
- **Database & Data Management** - SQL Server, PostgreSQL, MySQL
- **AI-Enhanced Development** - MCP Servers, AI Agents, LLM tools
- **Development Environment** - VS Code, Vim, Linux systems
- **Supporting Skills** - JavaScript, HTML/CSS, Vue.js

### 4. Resume Section
- **Professional Summary** - Career transition overview
- **Contact Information** - Complete contact details
- **Core Competencies** - Technical skill badges
- **Professional Experience** - Detailed work history
- **Education & Training** - Learning journey and certifications
- **Military Honors** - Awards and recognitions

### 5. Portfolio Section
- **BookLanding** - E-commerce platform (.NET Core, SQL Server)
- **Weather API Integration** - Real-time weather application
- **U-Bike Status Tracker** - Public transportation API integration
- **Personal Finance Tracker** - Financial management web application

### 6. Contact Section
- Contact information display
- Interactive contact form with EmailJS integration
- Form validation and user feedback
- Professional contact details

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE for customization
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pillar-theme.git
   cd pillar-theme
   ```

2. **Open the project**
   ```bash
   # Open in your preferred browser
   open index-standalone.html
   
   # Or serve with a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Customize content**
   - Edit `index-standalone.html` for content changes
   - Modify `assets/css/snapfolio.css` for styling
   - Update `assets/js/snapfolio.js` for functionality
   - Replace images in `assets/images/` with your own

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Follow the setup guide in `EMAILJS_SETUP.md`
3. Update the EmailJS configuration in the JavaScript section

## 🎯 Customization Guide

### Personal Information
Update the following sections in `index-standalone.html`:
- Personal details and contact information
- Professional summary and background
- Skills and technologies
- Work experience and education
- Portfolio projects and descriptions

### Styling
- **Main Styles**: `assets/css/snapfolio.css`
- **Color Schemes**: `assets/css/pillar-[1-6].css`
- **Custom Styles**: Add to existing CSS files or create new ones

### Images
Replace the following images with your own:
- `assets/images/profile-2.webp` - Hero section profile
- `assets/images/profile-square-3.webp` - About section profile
- `assets/images/project-[1-3].jpg` - Portfolio project images

### Translations
Update language files:
- `assets/lang/en.json` - English translations
- `assets/lang/zh-TW.json` - Chinese Traditional translations

## 📊 Performance Features

- **Optimized Images** - WebP format for better compression
- **CDN Integration** - Fast loading of external libraries
- **Minified Resources** - Compressed CSS and JavaScript
- **Lazy Loading** - Images load as needed
- **Responsive Images** - Appropriate sizes for different devices

## 🔧 Browser Support

- **Chrome** - Latest versions
- **Firefox** - Latest versions
- **Safari** - Latest versions
- **Edge** - Latest versions
- **Mobile Browsers** - iOS Safari, Chrome Mobile

## 📈 SEO Features

- **Semantic HTML** - Proper heading structure and markup
- **Meta Tags** - Title, description, and keywords optimization
- **Open Graph** - Social media sharing optimization
- **Structured Data** - Schema markup for better search visibility
- **Mobile-Friendly** - Responsive design for mobile SEO

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is based on the Pillar Bootstrap template and is free to use with attribution. Please keep the footer attribution link as required by the original template license.

## 👤 Author

**Meng Hsun, Lee**
- **Email**: leetcodensc68@proton.me
- **LinkedIn**: [linkedin.com/in/meng-hsun-lee-77806b73](https://www.linkedin.com/in/meng-hsun-lee-77806b73/)
- **GitHub**: [github.com/tabbyBoots](https://github.com/tabbyBoots)
- **Website**: [tabbyboots.bloomski.com](https://tabbyboots.bloomski.com)

## 🙏 Acknowledgments

- **Original Template**: Pillar Bootstrap Template by [3rd Wave Media](https://themes.3rdwavemedia.com/)
- **Bootstrap**: Responsive framework
- **Font Awesome**: Icon library
- **AOS Library**: Animation on scroll effects
- **EmailJS**: Contact form functionality
- **Google Fonts**: Typography

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial portfolio website release
- Bilingual support (English/Chinese Traditional)
- Responsive design implementation
- Contact form integration
- Portfolio project showcase
- Professional resume section
- Skills and technology overview

---

**Built with ❤️ for showcasing backend development skills and professional journey**
