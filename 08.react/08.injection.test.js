import React from "react";
import {mount} from "enzyme";

describe("Dependency injection", () => {
    class Wrap extends React.Component {
        render() {
            const {children} = this.props;

            return (
                <div>
                    {children}
                </div>
            );
        }
    }

    class List extends React.Component {
        renderItem(item) {
            const {renderItem} = this.props;

            return (
                <div key={item.id}>
                    {renderItem(item)}
                </div>
            );
        }

        renderList() {
            const {list} = this.props;

            return list.map(this.renderItem, this);
        }

        render() {
            return (
                <div>
                    {this.renderList()}
                </div>
            );
        }
    }

    class Item extends React.Component {
        render() {
            const {item: {name}, children} = this.props;

            return (
                <div>
                    <div>
                        {name}
                    </div>

                    {children}
                </div>
            );
        }
    }

    /**
     *
     */
    class SubItem extends React.Component {
        render() {
            const {title, color} = this.props;

            return (
                <div style={{color}}>
                    {title}
                </div>
            );
        }
    }

    class Index extends React.Component {
        constructor(props) {
            super(props);

            this.renderItem = this.renderItem.bind(this);
        }

        /**
         *
         * Обычный элемент с подъелементом
         *
         * @param item - объект с ключами
         * - title,
         * - name,
         * - id
         */
        renderItem(item) {
            const
                {title} = item,
                {color} = this.props;

            return (
                <Item item={item}>
                    <SubItem
                        title={title}
                        color={color}
                    />
                </Item>
            );
        }

        render() {
            const {list} = this.props;

            return (
                <Wrap>
                    <List
                        renderItem={this.renderItem}
                        list={list}
                    />
                </Wrap>
            );
        }
    }

    test("Should inject list", () => {
        const fire = jest.fn();

        const wrap = mount(
            <List
                renderItem={fire}
                list={[{
                    id: 0,
                    name: "First",
                    title: "First",
                }, {
                    id: 1,
                    name: "Second",
                    title: "Second",
                }, {
                    id: 2,
                    name: "Third",
                    title: "Third",
                }]}
            />
        );

        expect(fire).toBeCalledTimes(3);
    });

    test("Should render empty", () => {
        const wrap = mount(
            <Index
                list={[]}
            />
        );

        expect(wrap.find(Item).length).toBe(0);
        expect(wrap.find(SubItem).length).toBe(0);
        expect(wrap.find(List).length).toBe(1);
        expect(wrap.find(Wrap).length).toBe(1);
    });

    test("Should inject list", () => {
        const wrap = mount(
            <Index
                list={[{
                    id: 0,
                    name: "First",
                    title: "First",
                }, {
                    id: 1,
                    name: "Second",
                    title: "Second",
                }, {
                    id: 2,
                    name: "Third",
                    title: "Third",
                }]}
                color="red"
            />
        );

        expect(wrap.find(Item).length).toBe(3);
        expect(wrap.find(SubItem).length).toBe(3);
        expect(wrap.find(SubItem).at(0).props().title).toBe("First");
        expect(wrap.find(SubItem).at(0).props().color).toBe("red");
    });
});
