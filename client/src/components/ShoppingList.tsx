import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IShoppingList, ITarget } from '../types/interfaces';

const ShoppingList = ({
  getItems,
  item,
  isAuthenticated,
  deleteItem,
}: IShoppingList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const [categoryGroup, setCategoryGroup] = useState('Baby');

  const handleChangeCategoryGroup = (e: ITarget) =>
    setCategoryGroup(e.target.value);
  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const { items } = item;
  return (
    <Container>
      {isAuthenticated ? (
        <>
          <h1>Categories</h1>
          <Input
            type="select"
            name="categories"
            id="categories"
            placeholder="Select shopping category"
            onChange={handleChangeCategoryGroup}
          >
            <option>Baby</option>
            <option>Beer, Wine and Spirits</option>
            <option>
              Beverages: tea, coffee, soda, juice, Kool-Aid, hot chocolate,
              water, etc.
            </option>
            <option>Bread and Bakery</option>
            <option>Breakfast and Cereal</option>
            <option>Canned Goods and Soups</option>
            <option>Condiments/Spices and Bake</option>
            <option>Cookies, Snacks and Candy</option>
            <option>Dairy, Eggs and Cheese</option>
          </Input>
        </>
      ) : null}
      <ListGroup>
        {isAuthenticated?<h1>Items</h1>:null}
        <TransitionGroup className="shopping-list">
          {items
            .filter((item) => item.category === categoryGroup)
            .map(({ _id, name, category }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(_id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  Item: {name}, Category: {category}
                </ListGroupItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
