import 'reflect-metadata';
import {Container, Inject, Service} from 'typedi';

describe("Injection", () => {

    interface Data {
        value: Number;
    }

    @Service("bean.factory")
    class DataInst implements Data {
        value: Number = 10;
    }

    @Service()
    class ExampleInjectedService {
        printMessage() {
            console.log('I am alive!');
        }
    }

    @Service()
    class ExampleService {
        constructor(
            // because we annotated ExampleInjectedService with the @Service()
            // decorator TypeDI will automatically inject an instance of
            // ExampleInjectedService here when the ExampleService class is requested
            // from TypeDI.
            public injectedService: ExampleInjectedService,
            // @Inject()
            public data: Array<Data>,
        ) {
            
            console.log(data);
            
            
        }
    }

    const serviceInstance = Container.get(ExampleService);


    test("Should create", () => {

        serviceInstance.injectedService.printMessage();
    });
});
