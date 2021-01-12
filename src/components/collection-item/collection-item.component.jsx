import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss'
import {connect} from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItem}) => {
    const {id, name, price, imageUrl} = item
    return (
    <div className='collection-item' >
        <div 
            className='image'
            style={
                {backgroundImage:`url(${imageUrl})`}
            }
        />
        <div className='collection-footer' >
            <div className='name' >
                {name}
            </div>
            <div className='price' >
                {price}
            </div>
        </div>
        <CustomButton onClick={() => addItem(item)}
        className = 'custom-button' inverted>Add to cart</CustomButton>
    </div>
)};
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem)