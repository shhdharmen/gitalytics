(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['main'],
  {
    /***/ 0:
      /*!***************************************!*\
  !*** multi ./apps/client/src/main.ts ***!
  \***************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! D:\Tutorials\full-stack\gitalytics\apps\client\src\main.ts */ 'Zr4m'
        );

        /***/
      },

    /***/ F1In:
      /*!******************************************************************!*\
  !*** ./apps/client/$$_lazy_route_resource lazy namespace object ***!
  \******************************************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        function webpackEmptyAsyncContext(req) {
          // Here Promise.resolve().then() is used instead of new Promise() to prevent
          // uncaught exception popping up in devtools
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          });
        }
        webpackEmptyAsyncContext.keys = function () {
          return [];
        };
        webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
        module.exports = webpackEmptyAsyncContext;
        webpackEmptyAsyncContext.id = 'F1In';

        /***/
      },

    /***/ 'KkI/':
      /*!*****************************************************!*\
  !*** ./apps/client/src/environments/environment.ts ***!
  \*****************************************************/
      /*! exports provided: environment */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'environment',
          function () {
            return environment;
          }
        );
        // This file can be replaced during build by using the `fileReplacements` array.
        // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
        // The list of file replacements can be found in `angular.json`.
        const environment = {
          production: false,
        };
        /*
         * For easier debugging in development mode, you can import the following file
         * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
         *
         * This import should be commented out in production mode because it will have a negative impact
         * on performance if an error is thrown.
         */
        // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

        /***/
      },

    /***/ Zr4m:
      /*!*********************************!*\
  !*** ./apps/client/src/main.ts ***!
  \*********************************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ 'fXoL'
        );
        /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./environments/environment */ 'KkI/'
        );
        /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./app/app.module */ 'q7cF'
        );
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/platform-browser */ 'jhN1'
        );

        if (
          _environments_environment__WEBPACK_IMPORTED_MODULE_1__['environment']
            .production
        ) {
          Object(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__['enableProdMode']
          )();
        }
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__[
          'platformBrowser'
        ]()
          .bootstrapModule(
            _app_app_module__WEBPACK_IMPORTED_MODULE_2__['AppModule']
          )
          .catch((err) => console.error(err));

        /***/
      },

    /***/ 'i0E/':
      /*!**********************************************!*\
  !*** ./apps/client/src/app/app.component.ts ***!
  \**********************************************/
      /*! exports provided: AppComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'AppComponent',
          function () {
            return AppComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ 'fXoL'
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/common/http */ 'tk/3'
        );

        class AppComponent {
          constructor(http) {
            this.http = http;
            this.hello$ = this.http.get('/api/hello');
          }
        }
        AppComponent.ɵfac = function AppComponent_Factory(t) {
          return new (t || AppComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵdirectiveInject'](
              _angular_common_http__WEBPACK_IMPORTED_MODULE_1__['HttpClient']
            )
          );
        };
        AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          'ɵɵdefineComponent'
        ]({
          type: AppComponent,
          selectors: [['gitalytics-root']],
          decls: 10,
          vars: 0,
          consts: [
            [2, 'text-align', 'center'],
            ['src', 'assets/gitalytics.png', 'alt', ''],
          ],
          template: function AppComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                0,
                'div',
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                1,
                'h1'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵtext'](
                2,
                'Gitalytics'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                3,
                'blockquote'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                4,
                'i'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵtext'](
                5,
                'A simple overview of your github activities'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](
                6,
                'img',
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelement'](7, 'br');
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementStart'](
                8,
                'q'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵtext'](
                9,
                'Coming soon...'
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵɵelementEnd']();
            }
          },
          styles: [
            '\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */',
          ],
        });
        /*@__PURE__*/ (function () {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__['ɵsetClassMetadata'](
            AppComponent,
            [
              {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__['Component'],
                args: [
                  {
                    selector: 'gitalytics-root',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.scss'],
                  },
                ],
              },
            ],
            function () {
              return [
                {
                  type:
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_1__[
                      'HttpClient'
                    ],
                },
              ];
            },
            null
          );
        })();

        /***/
      },

    /***/ q7cF:
      /*!*******************************************!*\
  !*** ./apps/client/src/app/app.module.ts ***!
  \*******************************************/
      /*! exports provided: AppModule */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          'AppModule',
          function () {
            return AppModule;
          }
        );
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/platform-browser */ 'jhN1'
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/core */ 'fXoL'
        );
        /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./app.component */ 'i0E/'
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/common/http */ 'tk/3'
        );

        class AppModule {}
        AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__[
          'ɵɵdefineNgModule'
        ]({
          type: AppModule,
          bootstrap: [
            _app_component__WEBPACK_IMPORTED_MODULE_2__['AppComponent'],
          ],
        });
        AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__[
          'ɵɵdefineInjector'
        ]({
          factory: function AppModule_Factory(t) {
            return new (t || AppModule)();
          },
          providers: [],
          imports: [
            [
              _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                'BrowserModule'
              ],
              _angular_common_http__WEBPACK_IMPORTED_MODULE_3__[
                'HttpClientModule'
              ],
            ],
          ],
        });
        (function () {
          (typeof ngJitMode === 'undefined' || ngJitMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_1__[
              'ɵɵsetNgModuleScope'
            ](AppModule, {
              declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__['AppComponent'],
              ],
              imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                  'BrowserModule'
                ],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__[
                  'HttpClientModule'
                ],
              ],
            });
        })();
        /*@__PURE__*/ (function () {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__['ɵsetClassMetadata'](
            AppModule,
            [
              {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__['NgModule'],
                args: [
                  {
                    declarations: [
                      _app_component__WEBPACK_IMPORTED_MODULE_2__[
                        'AppComponent'
                      ],
                    ],
                    imports: [
                      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                        'BrowserModule'
                      ],
                      _angular_common_http__WEBPACK_IMPORTED_MODULE_3__[
                        'HttpClientModule'
                      ],
                    ],
                    providers: [],
                    bootstrap: [
                      _app_component__WEBPACK_IMPORTED_MODULE_2__[
                        'AppComponent'
                      ],
                    ],
                  },
                ],
              },
            ],
            null,
            null
          );
        })();

        /***/
      },
  },
  [[0, 'runtime', 'vendor']],
]);
//# sourceMappingURL=main.js.map
