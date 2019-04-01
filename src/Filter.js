import React, { Component } from 'react';
import './App.css';



class Filter extends Component {
  constructor(props){
    super(props);


  }

  renderYesItems(items){
    return(
      <>
        {items.length > 0 ?
          <div className="e-output-count">{items.length}</div>:
          ""
        }
        <div className="e-output">
          {items.map(item => <div className="e-item">{item}</div>)}
        </div>
      </>
    );
  }

  renderNoItems(items){
    return (
      <>
        {items.length > 0 ?
          <div className="e-output-count">{items.length}</div>:
          ""
        }
        <div className="e-output m-filtered">
          {items.map(item => <div className="e-item">{item}</div>)}
        </div>
      </>
    );
  }

  render() {
    console.log(this.props);
    const yesItems =
      this.props.inputs.filter(this.props.filter);

    const noItems =
      this.props.inputs.filter(a=>!this.props.filter(a));

    console.log("filter rendering");
    console.log(yesItems);
    console.log(noItems);

    return (
      <section className="p-filter">
        <h3 className="e-title">{this.props.title}</h3>

        {this.renderYesItems(yesItems)}

        {this.renderNoItems(noItems)}



        {
          this.props.onFilter && typeof this.props.onFilter == "function" ?
          <button onClick={()=>this.props.onFilter(this.props.inputs)}>filter</button> :
          ""
        }
      </section>
    );
  }
}

export default Filter;
