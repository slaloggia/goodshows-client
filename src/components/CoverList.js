import React from 'react';
import Coverflow from 'react-coverflow';

class CoverList extends React.Component {

    state={
        active: 5
    }

    listShows = () => {
       return this.props.shows.map(show => (
        <img src={show.image} className='list-image' alt='playbill' key={show.id}/>
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
        //     '@media (max-width: 400px)': {
        //       width: '400px',
        //       height: '300px'
        //     }
        //   }}
        >
          <div
            // onClick={() => fn()}
            // onKeyDown={() => fn()}
            role="menuitem"
            tabIndex="0"
          >
          </div>
          {this.listShows()}

        </Coverflow>
      </div>
    );
  }
}

export default CoverList