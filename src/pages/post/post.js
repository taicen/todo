import React from 'react'

import { connect } from 'react-redux';
// import * as action from '../../store/actions/index';

import AnimLayout from '../../common/anim-layout'
import Layout from '../../common/layout'

import './post.scss';


class PostPage extends React.Component {

  state = {
    post: { text: 'Not text' }
  }

  componentDidMount() {
    // this.props.cache.forEach(element => {
    //   if(element.id === +this.props.match.params.id){
    //     this.setState({post: element})
    //   }
    // });
  }

  render(){
    // const { post } = this.state;

    return (
      <Layout>
        <AnimLayout>
          <section className="screen-post">
            <div className="b-unit-filter">
              <div className="b-filter">
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Даты пребывания в отеле</h3>
                  <div>
                    element datepicker
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Гости</h3>
                  <div>
                    element select
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Диапазон цены</h3>
                  <div>
                    element range
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Привелегии</h3>
                  <div>
                    <label className="q-field-checkbox">
                      <input type="checkbox"/>
                      <span>Можно курить</span>
                    </label>
                    <label className="q-field-checkbox">
                      <input type="checkbox"/>
                      <span>Можно с питомцами</span>
                    </label>
                    <label className="q-field-checkbox">
                      <input type="checkbox"/>
                      <span>Можно пригласить гостей</span>
                    </label>
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Доступность</h3>
                  <div>
                    <div className="q-media">
                      <label className="q-field-checkbox">
                        <div className="q-media__ctrl">
                          <input type="checkbox"/>
                          <span></span>
                        </div>
                        <div className="q-media__data">
                          <dl>
                            <dt>Широкий коридор</dt>
                            <dd>Ширина коридора в номере не менее 91см</dd>
                          </dl>
                        </div>
                      </label> 
                    </div>
                    <div className="q-media">
                      <label className="q-field-checkbox">
                        <div className="q-media__ctrl">
                          <input type="checkbox"/>
                          <span></span>
                        </div>
                        <div className="q-media__data">
                          <dl>
                            <dt>Помощник для инвалидов</dt>
                            <dd>На 1 этаже вас встретит специалист и проводит до номера</dd>
                          </dl>
                        </div>
                      </label> 
                    </div>
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Удобства номера</h3>
                  <div>
                    element select
                  </div>
                </div>
                <div className="b-filter__field">
                  <h3 className="b-filter__field__title">Дополнительные удобства</h3>
                  <div>
                    <div className="q-accordion">
                      <div>
                        <input type="checkbox" id="ac-1"/>
                        <label htmlFor="ac-1" className="q-accordion__head">
                         <span>Дополнительные удобства</span>
                         <i></i>
                        </label>
                        <article className="q-accordion__content">
                          <label className="q-field-checkbox">
                            <input type="checkbox"/>
                            <span>Можно курить</span>
                          </label>
                          <label className="q-field-checkbox">
                            <input type="checkbox"/>
                            <span>Можно с питомцами</span>
                          </label>
                          <label className="q-field-checkbox">
                            <input type="checkbox"/>
                            <span>Можно пригласить гостей</span>
                          </label>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="b-unit-rooms">
              <h2>Номера, которые мы для вас подобрали</h2>
              <div className="b-rooms-wrap">
                <div className="b-rooms-card">

                </div>
              </div>
            </div>
          </section>
        </AnimLayout>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => ({
  cache: state.walls.cache,
})

export default connect(mapStateToProps)(PostPage);