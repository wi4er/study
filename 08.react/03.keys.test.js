import React from "react";
import {mount} from "enzyme";

describe("React elements keys", () => {
    test("Should render with key", () => {
        function Custom() {
            React.useEffect(() => {
                console.log("EFFECT");
                
                
            });
            return (
                <div>

                </div>
            );
        }

        const wrap = mount(
            <Custom key={1}/>
        );


        wrap.

        wrap.render(
            <Custom key={2}/>
        );



    });

    test("Should update with key", () => {
        const onUpdate = jest.fn();
        const onMount = jest.fn();

        class Inner extends React.Component {
            componentDidMount = onMount;
            componentDidUpdate = onUpdate;

            render() {
                return null;
            }
        }

        function Custom(props) {
            const {type} = props;

            return (
                <div>
                    <Inner key={type}/>
                </div>
            );
        }

        const wrap = mount(
            <Custom
                type={1}
                onUpdate={onUpdate}
                onMount={onMount}
            />
        );

        expect(onMount).toBeCalledTimes(1);
        expect(onUpdate).toBeCalledTimes(0);

        wrap.setProps({type: 1});
        expect(onMount).toBeCalledTimes(1);
        expect(onUpdate).toBeCalledTimes(1);

        wrap.setProps({type: 2});
        expect(onMount).toBeCalledTimes(2);
        expect(onUpdate).toBeCalledTimes(1);
    });
});
