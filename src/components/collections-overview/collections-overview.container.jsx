import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionOverview from './collections-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
    )(CollectionOverview);

export default CollectionOverviewContainer