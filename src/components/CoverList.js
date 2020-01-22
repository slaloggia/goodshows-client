import React from 'react';
import Coverflow from 'react-coverflow';
import history from '../history'

class CoverList extends React.Component {

    state={
        active: 5
    }


    handleClick = (event) => {
      if (event.target.id === this.state.active)  {
        history.push(`/show/${event.target.id}`)
      }else{
        this.setState({active: event.target.id})
      }
    }

    listShows = () => {
       return this.props.shows.map(show => (
        <img src={show.image} className='list-image' alt='playbill' id={show.id} key={show.id} onClick={this.handleClick} />
      ) )
    }


  render() {
    return (
      <div id='cover-flow'>
        <Coverflow
          width={480}
          height={650}
          displayQuantityOfSide={2}
          navigation={false}
          enableHeading={false}
          infiniteScroll={true}
        >
          <div
            onClick={this.setActive}
            role="menuitem"
            tabIndex="0"
          >
         
          </div >
          {this.listShows()}

        </Coverflow>
      </div>
    );
  }
}

export default CoverList