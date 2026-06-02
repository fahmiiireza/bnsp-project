'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' : 'data-bs-target="#xs-controllers-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' :
                                            'id="xs-controllers-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' : 'data-bs-target="#xs-injectables-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' :
                                        'id="xs-injectables-links-module-AppModule-57def4964eb4542e1f5dc7333cbe25774590a248131693dae3b32370a304335c3ccd3109ed6f443412c762c79fc5146875ca1fc05492076d27d9802260c34a91"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileLoggerModule.html" data-type="entity-link" >FileLoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileLoggerModule-0718efc4037bcf70a6e200f001bb1d1f2fc0562458c9f4460f4e0b29c5831ad11cd59ba9870d7f558a0e01aab73ce6101eae728513a84d632f7d17250e34e160"' : 'data-bs-target="#xs-injectables-links-module-FileLoggerModule-0718efc4037bcf70a6e200f001bb1d1f2fc0562458c9f4460f4e0b29c5831ad11cd59ba9870d7f558a0e01aab73ce6101eae728513a84d632f7d17250e34e160"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileLoggerModule-0718efc4037bcf70a6e200f001bb1d1f2fc0562458c9f4460f4e0b29c5831ad11cd59ba9870d7f558a0e01aab73ce6101eae728513a84d632f7d17250e34e160"' :
                                        'id="xs-injectables-links-module-FileLoggerModule-0718efc4037bcf70a6e200f001bb1d1f2fc0562458c9f4460f4e0b29c5831ad11cd59ba9870d7f558a0e01aab73ce6101eae728513a84d632f7d17250e34e160"' }>
                                        <li class="link">
                                            <a href="injectables/FileLoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileLoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LibraryModule.html" data-type="entity-link" >LibraryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' : 'data-bs-target="#xs-controllers-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' :
                                            'id="xs-controllers-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' }>
                                            <li class="link">
                                                <a href="controllers/LibraryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' : 'data-bs-target="#xs-injectables-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' :
                                        'id="xs-injectables-links-module-LibraryModule-505be678e87b71f1053e2553040e71ffdd14800d2dc8340faa20db8b0920b281d78b11e494d79fbb1b6f8bf181129fe5de37e77a35c141cce56d8ab511ecd9e2"' }>
                                        <li class="link">
                                            <a href="injectables/LibraryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BorrowRecord.html" data-type="entity-link" >BorrowRecord</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LibraryItem.html" data-type="entity-link" >LibraryItem</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Member.html" data-type="entity-link" >Member</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ArrayUtils.html" data-type="entity-link" >ArrayUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/Book.html" data-type="entity-link" >Book</a>
                            </li>
                            <li class="link">
                                <a href="classes/LibraryItem.html" data-type="entity-link" >LibraryItem</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IBaseEntity.html" data-type="entity-link" >IBaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBorrowRecord.html" data-type="entity-link" >IBorrowRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILibraryItem.html" data-type="entity-link" >ILibraryItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMember.html" data-type="entity-link" >IMember</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});