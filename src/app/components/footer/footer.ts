import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  template: `
    <footer class="footer">
      <div class="footer-social-qr-container">
        <div class="footer-social-qr-wrapper">
          <div class="footer-social">
            <span class="social-title">Suivez-nous</span>
            <a
              href="https://www.youtube.com/user/googlechrome"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              class="social-icon"
            >
              <mat-icon svgIcon="youtube"></mat-icon>
            </a>
            <a
              href="https://twitter.com/googlechrome"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="X"
              class="social-icon"
            >
              <mat-icon svgIcon="x"></mat-icon>
            </a>
            <a
              href="https://www.facebook.com/googlechrome/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Facebook"
              class="social-icon"
            >
              <mat-icon svgIcon="facebook"></mat-icon>
            </a>
            <a
              href="https://www.linkedin.com/showcase/google-chrome/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              class="social-icon"
            >
              <mat-icon svgIcon="linkedin"></mat-icon>
            </a>
            <a
              href="https://www.tiktok.com/@googlechrome"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="TikTok"
              class="social-icon"
            >
              <mat-icon svgIcon="tiktok"></mat-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-top">
        <div class="footer-column">
          <h3>Produits Chrome</h3>
          <a href="#">Autres plates-formes </a>
          <a
            href="https://www.google.com/intl/fr_FR/chromebook/"
            target="_blank"
            rel="noopener noreferrer"
            >Chromebooks
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://www.google.com/chromecast/"
            target="_blank"
            rel="noopener noreferrer"
            >Chromecast
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://chromewebstore.google.com/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome Web Store
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
        </div>

        <div class="footer-column">
          <h3>Entreprise</h3>
          <a
            href="https://chromeenterprise.google/intl/fr_FR/browser/download/"
            target="_blank"
            rel="noopener noreferrer"
            >Download Chrome Browser
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://chromeenterprise.google/intl/fr_FR/"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome Browser for Enterprise
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://chromeenterprise.google/intl/fr_FR/devices/"
            target="_blank"
            rel="noopener noreferrer"
            >Appareils Chrome
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://chromeenterprise.google/intl/fr_FR/os/"
            target="_blank"
            rel="noopener noreferrer"
            >ChromeOS
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://cloud.google.com/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            >Google Cloud
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://gsuite.google.com/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            >Google Workspace
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
        </div>

        <div class="footer-column">
          <h3>Éducation</h3>
          <a
            href="https://edu.google.com/intl/fr_FR/products/more-products/"
            target="_blank"
            rel="noopener noreferrer"
            >Navigateur Google Chrome
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://edu.google.com/intl/fr_FR/products/more-products/"
            target="_blank"
            rel="noopener noreferrer"
            >Appareils
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
        </div>

        <div class="footer-column">
          <h3>Développeurs et partenaires</h3>
          <a
            href="https://www.chromium.org/"
            target="_blank"
            rel="noopener noreferrer"
            >Chromium
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://www.chromium.org/"
            target="_blank"
            rel="noopener noreferrer"
            >ChromeOS
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://developer.chrome.com/webstore/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome Web Store
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://www.chromeexperiments.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome Experiments
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://www.google.com/intl/fr/chrome/beta/"
            target="_blank"
            rel="noopener noreferrer"
            >Version bêta de Chrome
          </a>
          <a
            href="https://www.google.com/intl/fr/chrome/dev/"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome pour les développeurs
          </a>
          <a
            href="https://www.google.com/intl/fr/chrome/dev/"
            target="_blank"
            rel="noopener noreferrer"
            >Chrome Canary
          </a>
        </div>

        <div class="footer-column">
          <h3>Assistance</h3>
          <a
            href="https://support.google.com/chrome/?hl=fr&rd=3#topic=7438008"
            target="_blank"
            rel="noopener noreferrer"
            >Aide Chrome
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
          <a
            href="https://www.google.com/intl/fr/chrome/update/"
            target="_blank"
            rel="noopener noreferrer"
            >Mettre à jour Chrome
          </a>
          <a
            href="https://www.google.com/intl/fr/chrome/tips/"
            target="_blank"
            rel="noopener noreferrer"
            >Astuces Chrome
          </a>
          <a
            href="https://blog.google/intl/fr-fr/"
            target="_blank"
            rel="noopener noreferrer"
            >Blog Google Chrome
            <mat-icon class="external-icon">arrow_outward</mat-icon></a
          >
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="google-logo"
            >Google</a
          >
          <div class="footer-bottom-left">
            <a
              href="https://policies.google.com/privacy?hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              >Confidentialité et conditions d'utilisation</a
            >
            <a
              href="https://about.google/"
              target="_blank"
              rel="noopener noreferrer"
              >À propos de Google</a
            >
            <a
              href="https://about.google/"
              target="_blank"
              rel="noopener noreferrer"
              >Produits Google</a
            >
          </div>
        </div>

        <div class="footer-bottom-right">
          <a
            href="https://support.google.com/chrome/?hl=fr&rd=3#topic=7438008"
            target="_blank"
            rel="noopener noreferrer"
            class="help-link"
          >
            <mat-icon class="help-icon">help</mat-icon> Aide
          </a>
          <select class="language-select">
            <option>Français - France</option>
            <option>English - US</option>
          </select>
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer.footer {
      background-color: #ffffff;
      padding: 0 0 2rem 0;
      position: relative;
    }

    .footer-social-qr-container {
      border-bottom: 1px solid #dadce0;
    }
    .footer-social-qr-wrapper {
      padding: 1.5rem 2rem;
    }

    .footer-social {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .social-title {
      font-size: 1rem;
      font-weight: 500;
      color: #202124;
      margin-right: 0.5rem;
    }
    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }
    .social-icon mat-icon {
      width: 1.2rem;
      height: 1.2rem;
    }

    .footer-top {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
      padding: 2.5rem 2rem;
      margin: 0 auto;
    }

    .footer-bottom {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem 2rem;
      border-top: 1px solid #dadce0; 
    }
        
    .footer-bottom-left {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }

    .google-logo {
      font-weight: 400;
      font-size: 1.80rem;
    }

    .footer-bottom-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .language-select {
        border: none;
        padding: 0.1rem;
        font-size: 1rem;
        color: #5b5b5b;
        border-bottom: 1px solid #dadce0; 
      }
      .help-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1rem;
      }
      .help-icon{
        color: #7c7d7dff;
      }
      @media(max-width: 800px){
        .footer-top{
          display: flex;
          flex-wrap: wrap;
        }
      }
 `,
})
export class Footer {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/facebook.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'x',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/x.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'youtube',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/youtube.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/linkedin.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'tiktok',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/tiktok.svg'
      )
    );
  }
}
