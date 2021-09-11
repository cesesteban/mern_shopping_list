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

  const [categoryGroup, setCategoryGroup] = useState('1');

  const handleChangeCategoryGroup = (e: ITarget) => setCategoryGroup(e.target.value);
  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const { items } = item;
  return (
    <Container>
      <Input
        type="select"
        name="categories"
        id="categories"
        placeholder="Select shopping category"
        onChange={handleChangeCategoryGroup}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.filter(item=>item.category===categoryGroup).map(({ _id, name, category }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {!isAuthenticated ? (
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
