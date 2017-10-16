import { Injectable, Inject, EventEmitter } from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token
import { AuthService } from   '../auth/auth.service';

@Injectable()
export class TranslateService {

	private _currentLang: string;
	private PLACEHOLDER = '%';
	private _defaultLang: string;
  private _fallback: boolean;

	public onLangChanged: EventEmitter<string> = new EventEmitter<string>();



	// public get currentLang() {
  //   return this._currentLang
  //   // return 'fr'
  //   // return this.authService.getLanguage()
  //   // return this._currentLang || this._defaultLang;
  // }

  // public setDefaultLang(lang: string) {
  //   this._defaultLang = lang;
  // }

  public enableFallback(enable: boolean) {
    this._fallback = enable;
  }

  // inject our translations
	constructor(
		@Inject(TRANSLATIONS) private _translations: any,
		private authService: AuthService
	) {
    	// this._currentLang = this.authService.getLanguage()
	}

	// public use(lang: string): void {
	// 	// set current language
	// 	this._currentLang = lang;
	// 	this.onLangChanged.emit(lang);
	// }

	private translate(key: string): string {
    let translation = key;
		let langAuth = this.authService.getLanguage()
    // found in current language
    if (this._translations[langAuth] && this._translations[langAuth][key]) {
      return this._translations[langAuth][key];
      }

    // fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    // if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
    //   return this._translations[this._defaultLang][key];
    // }

    // not found
    return translation;
  }

  public replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
      values.forEach((e, i) => {
        translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
      });

    return translation;
  }

	public instant(key: string, words?: string | string[]) {
		// public perform translation
		const translation: string = this.translate(key);

    if (!words) return translation;
    return this.replace(translation, words);
	}
}
