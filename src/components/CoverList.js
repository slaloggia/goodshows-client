import React from 'react';
import Coverflow from 'react-coverflow';
// import history from '../history'

class CoverList extends React.Component {

    state={
        active: 5
    }

    // activeClick = (event) => {
    //     console.log(event.target)
    // }

    setActive = (event) => {
        console.log(event.target)
    }

    listShows = () => {
       return this.props.shows.map(show => (
        <img src={show.image} className='list-image' alt='playbill' id={show.id} key={show.id}  />
      ) )
    }


  render() {
    return (
      <div>
        <Coverflow
          width={480}
          height={500}
          displayQuantityOfSide={2}
          navigation={false}
          enableHeading={false}
          active={this.state.active}
          infiniteScroll={true}
        //   media={{
        //     '@media (max-width: 200px)': {
        //       width: '200px',
        //       height: '150px'
        //     }
        //   }}
        >
          <div
            onClick={this.setActive}
            // onKeyDown={() => fn()}
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