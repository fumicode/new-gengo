import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {GengoYear} from './libs/GengoYear';

import Filter  from "./Filter.js";

const {gengos, KANJI2GENGOS} = require("./libs/gengos.js");
const japanameKanjis = require("./libs/japanameKanjis");
const {KAN, SHI} = require("./libs/eto.js");

const kanjis = Object.keys(KANJI2GENGOS);

//まず、どの字がどれぐらい使われているかをカウント


console.log(Filter);


class App extends Component {
  constructor(arg){
    super(arg);

    this.state = {
      notYetKanjis:[],
      traditionalKanjis:[],
      filteredTraditionalKanjis:[],
      filters :[
        {
          title: "これまで元号に使われてきた",
          input: kanjis,
          filter:key=>true,
        },
        {
          title: "最近のを削除",
          input: [],
          filter:key=>!("平成昭和".split("").includes(key)),
        },
      ]
    };

    this.loadJapaname = ()=>{
      console.log("loading")
      if(japanameKanjis.kanjis){
        console.log("found");
        console.log(japanameKanjis.kanjis);
        this.setState({"notYetKanjis": japanameKanjis.kanjis});
      }
      else{
        console.log("not found");
        console.log(japanameKanjis.kanjis);
      }
    }

    this.getTraditionalKanjis = (kanjis)=>{
      console.log("kanjis");
      console.log(kanjis);
      this.setState({
        traditionalKanjis:kanjis
      });
    }
  }

  render() {
    console.log("render");
    console.log(this.state.notYetKanjis);
    return (
      <div className="App">
        <div className="p-container">
          <div className="c-grid">
            <div className="e-cell">
              {
                this.state.filters.map( filterObj =>
                  <Filter
                    title=  {filterObj.title}
                    inputs= {filterObj.input}
                    filter= {filterObj.filter}
                  />
                )
              }
            </div>
            <div className="e-cell">
              <section className="p-filter">
                <h3 className="e-title">Japanameに登録されている</h3>

                <button onClick={this.loadJapaname}>読み込む</button>

                <div className="e-output">
                  { this.state.notYetKanjis && this.state.notYetKanjis.map(kanji => <div className="e-item">{kanji}</div>) }
                </div>

              </section>

              <section className="p-filter">
                <h3 className="e-title">ネガティブな漢字を削除</h3>

                <button onClick={this.loadJapaname}>読み込む</button>

                <div className="e-output">
                  { this.state.notYetKanjis && this.state.notYetKanjis.map(kanji => <div className="e-item">{kanji}</div>) }
                </div>

              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
