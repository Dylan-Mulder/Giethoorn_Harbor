# Solution Architecture - Giethoorn Harbor

## Auteurs

- Luc Joosten | 2140212
- Dylan Mulder | 2145766
- Jeremey Smits | 2141535
- Tim van Wouwe | 2123985

## Documentatie

### 1. A backlog with functional requirements, non-functional requirements and architectural constraints, based on assumptions or literature.

Zie _documentation/Requirements & DDD.xlsx_ voor alle eisen en de uitwerkingen van het domein, de entiteiten en de events.

### 2. Context map with a list of domain events.

Zie _documentation/Context Map.png_

### 3. ArchiMate model of the enterprise architecture.

Zie _documentation/Archimate.png_

### 4. Implementation of the enterprise architecture in technology of your choice.

Het gehele bestand waar deze READ.ME in staat, is de implementatie van het project. Hierbij is er voor het volgende gekozen:

- API: NestJS & TypeScript
- Ad Hoc Integration: Axios
- Containerization: Docker
- Databases: PostgreSQL
- Message Broker: RabbitMQ
- Microservices: NestJS, TypeScript & TypeORM

### 5. Postman or Swagger scripts that trigger the various RESTful web API’s to allow showing that functionality works. There’s no need to create a GUI!

Zie _documentation/Postman Scripts_ voor de Postman collections voor de Dock_Rental API en de Traffic_Planning API. Ook is er Swagger beschikbaar op :4100/docs en :4200/docs

### 6. A document describing where the following concepts have been applied in your solution and why they have been applied there. All mentioned concepts are compulsory.

Zie deze READ.ME :)

#### 6.1. Microservices based on the principles of DDD.

Microservices zijn toegepast op alle bounded contexts (zie ook _documentation/Context Map.png_):

- Billing
- Cargo Management
- Dock Rental
- Ecosystem
- Messaging
- Refilling
- Publications
- Security
- Traffic Control

Deze bounded contexts zijn elk andere aspecten van de Giethoor Harbor. Security is bijvoorbeeld verantwoordelijk voor de inspecties van schepen en vrachtwagens. Deze aspecten hebben allemaal een andere hoeveelheid capaciteit nodig. Door deze aspecten te splitsen in microservices is het mogelijk om individuele microservices te schalen naar hun vraag.

#### 6.2. Eventual consistency.

Eventual Consistency is gerealiseerd door gebruik te maken van Queue's binnen RabbitMQ. Neem bijvoorbeeld de microservices Traffic Control en Refilling. Deze draaien beide in een Docker container. Mocht bijvoorbeeld de Refilling microservice crashen en de container offline gaan, dan blijft de Traffic Control container draaien. In het geval dat Traffic Control een event published, belandt deze in de Queue. Wanneer de Refilling container weer online komt, zal deze na de initialisatie gelijk de events op de Queue ontvangen en verwerken. Op deze manier gaat er geen data verloren en onstaan er geen inconsistenties.

#### 6.3. Event driven architecture based on messaging.

Net zoals bij 6.1 is dit door de gehele applicatie toegepast. Hierdoor is het mogelijk voor de microservices om via RabbitMQ data uit te wisselen.

#### 6.4. Command Query Responsibility Segregation (CQRS).

CQRS slaat op het splitsen van de functionaliteiten read en write. Er is namelijk in productie vaak veel meer vraag naar reads dan naar writes. In ons project is dit toegepast bij Dock Rental. Er zal namelijk veel meer vraag zijn naar het bekijken van de beschikbare Docks, dan dat ze daadwerkelijk gehuurd zullen worden. Hierdoor is het mogelijk om gemakkelijk meer read functionaliteit te schalen zonder dat er overbodige write functionaliteit bijgeschakeld wordt. Dit wordt mede gefaciliteerd omdat er een extra docker container met een PostgreSQL database is aangemaakt voor de read functionaliteit. Ook deze container is hierdoor makkelijk schaalbaar.

#### 6.5. Event Sourcing.

Er wordt gebruik gemaakt van event sourcing d.m.v. een 2de PostgreSQL container, namelijk de event store. Deze database slaat alle events op met de koppeling naar het desbetreffende object. Mocht er een fout in de data ontstaan bij een microservice of de hoofddatabase valt weg en mist data, dan kan de event store gereplayed worden om de data te werken. Aangezien de event store in een aparte container draait, kan de applicatie gedeeltelijk functioneel blijven zonder de hoofddatabase. Wanneer de hoofddatabase weer online komt, worden de events gereplayed en is de data weer gepersisteerd.

#### 6.6. Enterprise Integration Patterns (at least one, make sure you identify an external system in your case).

Voor onze ad hoc integratie is er gekozen om de water quality reports en marine life reports te importeren van externe API's. Deze worden verwerkt in de microservice Ecosystem d.m.v. Axios. De API's zijn als volgt:

- https://www.aqualarm.nl/apwp/api/
- https://wmropendata.wur.nl/prod/

Door deze API's te gebruiken, zijn er accurate rapportages beschikbaar (gemaakt door professionals) voor de haven.

#### 6.7. Containerization of your implementation.

Containerization is gefaciliteerd aan de hand van Docker. Elke microservice heeft een eigen container, eveneens als RabbitMQ en de 3 eerder genoemde databases. Voor de microservices is dit toegepast zodat een fout in 1 deel van de applicatie er niet voor zorgt dat de gehele applicatie offline gaat. In dit geval zal alleen de microservice offline gaan, waardoor de rest van de applicaties beschikbaar blijft. Voor de databases en met name de event store is dit gedaan omdat de hoofddatabase een single point of failure was. Door de event store in een aparte container te persisteren, wordt er verlies van data voorkomen wanneer de hoofddatabase uitvalt, crasht of vastloopt.
