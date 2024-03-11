// import {Outlet} from 'react-router-dom';
import {useState} from 'react';
// import {useEffect} from 'react';
// import logo from './logo.svg';
// import './App.css';

function Page() {
  let rowKey = 0;
  const [listTd, setListTd] = useState([[]]);
  let setList;
  const [reversed, setReversed] = useState(true);
  setList = [
    [1, 'Makan', '2', '2024-03-11', 'Ongoing']
  , [2, 'Minum', '1', '2024-03-21', 'Finished']
  , [3, 'Makan Lagi', '2', '2024-03-12', 'Finished']
  , [4, 'Minum Lagi', '1', '2024-03-02', 'Ongoing']
  ];
  if (listTd.length === 1){
    console.log('rerender');
    setListTd(setList);
  }

  function Add(rowKey) {
      rowKey +=1;
      let date = new Date();
      date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      date = date.split("-");
        let fullDate = date.map((item) =>{
          if(item.length === 1){
            item = "0" + item;
          }
          return item;
        });
        fullDate = fullDate.join('-');

      const listDummy = [...listTd,[rowKey, '', '', fullDate, '']];
      setListTd(listDummy);
  }

  function Delete(id) {
    if(window.confirm(`Delete current to-do ?\n id : ${id}`) === true){
      const listDummy = listTd.filter((item) => item[0] !== id);
      setListTd(listDummy);
      return (
        alert('Item deleted')
      );
    }
  }

  function Edit(id, text, col){
    let x = prompt("Edit?", text);
    if (x !== null){
      const listDummy = listTd.map((item) => {
        if(item[0] === id){
          item[col] = x;
        };
        return item;
      });
      setListTd(listDummy);
    }
  }

  function StatusUp(id, stus){
    const listDummy = listTd.map((item) => {
      if(item[0] === id){
        item[4] = stus === 'Ongoing'? 'Finished' : 'Ongoing';
      };
      return item;
    });
    setListTd(listDummy);
  }

  function Row({rowItems}) {
    return (
      <>
          <div 
          className='grid-item grid-content' 
          onClick={(()=>Delete(rowItems[0]))}
          >{rowItems[0]}</div>
          <div className='grid-item grid-content' onClick={(()=>Edit(rowItems[0], rowItems[1], 1))}
          >{rowItems[1]}</div>
          <div className='grid-item grid-content' onClick={(()=>Edit(rowItems[0], rowItems[2], 2))}
          >{rowItems[2]}</div>
          <div className='grid-item grid-content' onClick={(()=>Edit(rowItems[0], rowItems[3], 3))}
          >{rowItems[3]}</div>
          <div className='grid-item grid-content' onClick={(()=>StatusUp(rowItems[0], rowItems[4]))}
          >{rowItems[4]}</div>
      </>
    );
  }

  function Sort(rowCol){
    let listDummy = listTd.map((item,index) => {
      return (item[rowCol].toString() + `__${index}`);
    });

    listDummy = listDummy.sort().map((item) => {
      let x = item.lastIndexOf('__');
      return parseInt(item.slice(x+2));
    });

    if (reversed){listDummy = listDummy.reverse();} 
    setReversed(!reversed);
    
    listDummy = listDummy.map((item) => {
      return listTd[item];
    });
    setListTd(listDummy);
  }
  
  function Record(){
    const rows = listTd.map((rowItem) => {
        rowKey = rowItem[0];
        return (
              <Row rowItems={rowItem} key = {rowKey.toString()}/>
        );
    });
    return (rows);
  }

  function Info({onAdd, onSort}){
    return (
      <>
        <div className='grid-item grid-add' onClick={() => onAdd(rowKey)}>+</div>
        <div className='grid-item grid-head' onClick={() => onSort(0) }>Id</div>
        <div className='grid-item grid-head' >Deskripsi</div>
        <div className='grid-item grid-head' onClick={() => onSort(2) }>Prioritas</div>
        <div className='grid-item grid-head' onClick={() => onSort(3) }>Due</div>
        <div className='grid-item grid-head' onClick={() => onSort(4) }>Status</div>
      </>
    );  
  }

  return (
    <>
      <h1>To-do List</h1>
      <div className="grid-container">
        <Info onAdd = {Add} onSort = {Sort}/>
        <Record/>
      </div>
    </>
  );
}

export default Page;
