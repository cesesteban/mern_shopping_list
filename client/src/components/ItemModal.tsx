import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';

const ItemModal = ({ isAuthenticated, addItem }: IItemModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Baby');

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: ITarget) => setName(e.target.value);
  const handleChangeCategory = (e: ITarget) => setCategory(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (name !== '') {
      const newItem = {
        name,
        category,
      };

      // Add item via addItem action
      addItem(newItem);
      // Close modal
      handleToggle();
    } else {
      alert('choose item name');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Label for="categories">Categories</Label>
              <Input
                type="select"
                name="categories"
                id="categories"
                placeholder="Select shopping category"
                onChange={handleChangeCategory}
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
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
