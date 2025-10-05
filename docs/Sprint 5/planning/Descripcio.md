S5.01. Entrega d'exercici: Laravel API REST
Objectius
Comprendre l'arquitectura d'una API REST.
Disseny d'endpoints.
Pràctica de test funcional sobre una API REST.

Descripció

En aquesta pràctica aprendràs a crear una API REST completa amb control d'accés configurat mitjançant tokens.

La idea aquí és que agafis el projecte que vas realitzar a l’Sprint 4 i el converteixis d’una arquitectura MVC a una API REST. Has de tenir en compte, però, que els endpoints els hauràs de dissenyar tu mateix/a i que serà condició indispensable obtenir-ne l’aprovació prèvia abans de desenvolupar el teu projecte.

A més, has de tenir en compte que el projecte ha de complir els següents requisits:

Com a mínim 2 recursos mantenibles.
Gestió d’usuaris amb autenticació mitjançant la llibreria Passport.
Almenys 2 rols diferenciats.
Lògica de càlcul més complexa que un simple CRUD.

Nivell 1
Recorda que, abans de picar una sola línia de codi font productiu (els experiments que facis abans per entendre les diferents eines no compten), has d’entendre què has de fer. En aquest sentit, les preguntes clau per començar podrien ser:

Quina informació vull registrar?
Què pot fer cada tipus d’usuari?
Quins són els endpoints que faré servir perquè els usuaris hi accedeixin?

Afegeix seguretat

Inclou autenticació amb Passport en tots els accessos a les URL de l’API.
Defineix un sistema de rols i restringeix l'accés a les diferents rutes segons el nivell de privilegis.

Testing

Crea els tests funcionals de l'aplicació. Et recomanem aplicar TDD per provar cadascuna de les rutes. Escriure els tests abans del codi t’ajudarà a aclarir què ha de fer la teva aplicació.

Nivell 2
Crea la documentació de la teva API per a explicar als clients/es front-end com haurien de consumir l'API.

Nivell 3
Fes un deploy de la teva API. Pots fer-ho al servidor que vulguis o fent servir Laravel Forge.