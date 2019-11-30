import React, {Component} from 'react'
import AnimLayout from '../../common/anim-layout'
import Layout from '../../common/layout'
import ReactPaginate from 'react-paginate';

import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import * as api from '../../utils/api';

import RadioButton from '../../components/radio-button';
import ButtonGroup from '../../components/button-group';

import './splash.scss'

class SplashPage extends Component {
  state = {
    role: localStorage.getItem('role') || 'user',
    perPage: 3,
    error: {},
    data: {
      tasks: [],
      total_task_count: 0
    },
    page: this.props.location.hash ? +this.props.location.hash.match(/[0-9]+/).pop() - 1 : 0,
  }

  componentDidMount(){
    let paramSort = this.querySplit(this.props.location.search) || {};
    this.initialPage(this.state.page + 1, paramSort);
    this.checkTokenTime();
  }

  querySplit = (query) => {
    let isObj={};
    let serialize = query.length ? query.slice(1).split(/&/g) : [];
    serialize.forEach((item)=>{
      let obj = {};
      let arr = item.split('=');
      obj[`${arr[0]}`] = arr[1];
      isObj={ ...isObj, ...obj };
    })
    return isObj;
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.data !== this.state.data){
      this.checkTokenTime();
    }
  }

  checkTokenTime = () => {
    let date = new Date();
    let tokenDate = new Date(localStorage.getItem('timetoken'));
    if( localStorage.getItem('timetoken') && (tokenDate <= date) ){
      alert('Время сессии истекло, повторите вход')
      localStorage.setItem('token', '');
      localStorage.setItem('role', 'user');
      localStorage.setItem('timetoken', '');
      this.setState({role: 'user'})
    }
  }

  getPage = (path) => {
    let number = +path.match(/[0-9]+/).pop() || 0;
    return number;
  }

  sortByField = (value) => {
    let fields = this.getFields(value, 'sort_field');
    let page = this.getPage(this.props.location.hash);
    this.props.history.push(api.encodeObjectToURI(fields) + this.props.location.hash);
    this.initialPage(page, fields);
  }

  sortByDirection = (value) => {
    let fields = this.getFields(value, 'sort_direction');
    let page = this.getPage(this.props.location.hash);
    this.props.history.push(api.encodeObjectToURI(fields) + this.props.location.hash);
    this.initialPage(page, fields);
  }

  getFields = (value, field_name) => {
    let fields = this.querySplit(this.props.location.search);
    fields[`${field_name}`] = value;
    return fields;
  }

  addTask = (e) => {
    e.preventDefault();
    let formData = new FormData(document.forms.formAdd);
    let page = this.getPage(this.props.location.hash);
    let fields = this.querySplit(this.props.location.search);
    api.addTask( formData ).then((res)=>{
      if(res.status === 'error'){
        this.setState({error: res.message})
      } else {
        alert('Задача успешно добавлена!');
        this.initialPage(page, fields);
      }
    });
  }

  editTask = (idx, id) => evt => {
    const newTask = this.state.data.tasks.map((task, sidx) => {
      if (idx !== sidx) return task;
      return { ...task, text: evt.target.value };
    });
    this.setState((prev) => ({data: {tasks: newTask, total_task_count: prev.data.total_task_count}}));
    let form = new FormData();
        form.append("token", localStorage.getItem('token'));
        form.append("text", evt.target.value);
    api.editTask( id, form ).then((res)=>{
      if(res.status === 'error'){
        alert('У вас нет доступа!')
      } else {
        alert('Задача успешно изменена!');
      }
    });
  };

  editStatusTask = (idx, id) => evt => {
    const newTask = this.state.data.tasks.map((task, sidx) => {
      if (idx !== sidx) return task;
      return { ...task, status: evt.target.checked ? 10 : 0 };
    });

    this.setState((prev) => ({data: {tasks: newTask, total_task_count: prev.data.total_task_count}}));

    let form = new FormData();
        form.append("token", localStorage.getItem('token'));
        form.append("status", evt.target.checked ? 10 : 0);
    api.editTask( id, form ).then((res)=>{
      if(res.status === 'error'){
        alert('У вас нет доступа!')
      } else {
        alert('Статус задачи успешно изменен!');
      }
    });
  };

  initialPage = (page, {sort_field, sort_direction}) => {
    this.props.onLoadTasks({page, sort_field, sort_direction})
      .then(() => {
        this.setState({data: {
            tasks: this.props.dataTasks.tasks,
            total_task_count: this.props.dataTasks.total_task_count
          }
        })
      });
  }

  handlePageClick = data => {
    let paramSort = this.querySplit(this.props.location.search) || {};
    let selected = data.selected + 1 ;

    this.props.history.push(this.props.location.search + '#page' + selected);

    this.initialPage(selected, paramSort);
  };

  render(){
    const {tasks, total_task_count} = this.state.data;
    return (
      <Layout>
        <AnimLayout>
          <section className="screen-splash">
            <div className="b-main">
              <form name="formAdd" className="b-task-add">
              <fieldset>
                <legend>Добавить задачу</legend>
                <label className="b-form-field">
                  Имя пользователя:
                  {(this.state.error.username) ?
                    <div className="b-form-error">{this.state.error.username}</div> : null}
                  <input type="text" name="username"/>
                </label>
                <label className="b-form-field">
                  Email:
                  {(this.state.error.email) ?
                    <div className="b-form-error">{this.state.error.email}</div> : null}
                  <input type="text" name="email"/>
                </label>
                <label className="b-form-field">
                  Текст задачи:
                  {(this.state.error.text) ?
                    <div className="b-form-error">{this.state.error.text}</div> : null}
                  <input type="text" name="text"/>
                </label>
                <div className="b-form-btn">
                  <button className="btn" onClick={(e)=>{ this.addTask(e) }}><span>Add</span></button>
                </div>
              </fieldset>
              </form>
              <div className="b-sort-control">
              <ButtonGroup className="btn-group">
                <RadioButton name="sort" value="id" id="sd" label="default" onChange={(e)=>{ this.sortByField(e.target.value) }}/>
                <RadioButton name="sort" value="username" id="sdd" label="by name" onChange={(e)=>{ this.sortByField(e.target.value) }}/>
                <RadioButton name="sort" value="email" id="sddd" label="by email" onChange={(e)=>{ this.sortByField(e.target.value) }}/>
                <RadioButton name="sort" value="status" id="sdddd" label="by status" onChange={(e)=>{ this.sortByField(e.target.value) }}/>
              </ButtonGroup>
              <ButtonGroup className="btn-group">
                <RadioButton name="order_by" value="asc" id="asc" label="asc" onChange={(e)=>{ this.sortByDirection(e.target.value) }}/>
                <RadioButton name="order_by" value="desc" id="desc" label="desc" onChange={(e)=>{ this.sortByDirection(e.target.value) }}/>
              </ButtonGroup>
              </div>
              {
                tasks &&
                tasks.map((task, idx) => {
                  return(
                    <div className="b-task-item" key={idx}>
                      <div className="b-task-item__username">{task.username}</div>
                      <div className="b-task-item__email">{task.email}</div>
                      <div className="b-task-item__text">
                      { (this.state.role === 'admin') ?
                      <input
                        type="text"
                        value={task.text}
                        onChange={this.editTask(idx, task.id)}
                      />
                      : <p dangerouslySetInnerHTML={{__html: task.text}}></p>
                      }
                      </div>
                      <div className="b-task-item__status">
                      { (this.state.role === 'admin') ?
                      <input
                        type="checkbox"
                        checked={(task.status === 10) ? true : false}
                        onChange={this.editStatusTask(idx, task.id)}
                      />
                      : (task.status === 10) ? <i className="is-close">close</i> : <i className="is-open">open</i> }
                      </div>
                    </div>
                  )
                })
              }

              <ReactPaginate
                pageCount={Math.ceil(+total_task_count/this.state.perPage)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={this.handlePageClick}
                nextLabel="&rarr;"
                previousLabel="&larr;"
                initialPage={this.state.page}
                disableInitialCallback={true}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </section>
        </AnimLayout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  dataTasks: state.tasks.tasks,
})
const mapDispatchToProps = (dispatch) => {
  return {
      onLoadTasks: ( params ) => dispatch( action.fetchTask( params ) ),
      // onPostTask: ( params ) => dispatch( action.addTask( params ))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);