import React, { Component } from 'react';
import { get, isEmpty, isArray } from 'lodash';
import { Button, Radio, Checkbox, Row } from 'antd';

import InputWithScroll from '../components/inputWithScroll/index';
import InputF from './inputFields';
import './style.scss'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isFocusableInput = val => !!(val && typeof val.focus === 'function');

const getFormInputs = name => () => {
  if (typeof document === 'undefined') {
    return [];
  }
  const form = document.forms[name];
  return ((form && form.length
    ? Array.prototype.slice.call(form).filter(isFocusableInput)
    : []): any[]);
};

export default class MyForm extends Component {
  state = {
    fullNameOfTheTestWork: '',
    abbreviatedNameOfTheTestWork: '',
    email: '',
    phone: '',
    site: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    country: '',
    zip: '',
    region: '',
    city: '',
    locality: '',
    street: '',
    homeOffice: '',

    isSubmitting: false,
    recognitionInTheSystem: false,

    firstError: "",

    services: [],

    COS_1_RegistrationNumber: '',
    COS_1_DateFfIssue: '',
    COS_1_ValidUntil: '',
    COS_1_ActivityArea: [],
    COS_1_ActivityAreaInput: '',

    COS_2_RegistrationNumber: '',
    COS_2_DateFfIssue: '',
    COS_2_ValidUntil: '',
    COS_2_ActivityArea: [],
    COS_2_ActivityAreaInput: '',

    COS_3_RegistrationNumber: '',
    COS_3_DateFfIssue: '',
    COS_3_ValidUntil: '',
    COS_3_ActivityArea: [],
    COS_3_ActivityAreaInput: '',

    COS_4_RegistrationNumber: '',
    COS_4_DateFfIssue: '',
    COS_4_ValidUntil: '',
    COS_4_ActivityArea: [],
    COS_4_ActivityAreaInput: '',

    COS_5_RegistrationNumber: '',
    COS_5_DateFfIssue: '',
    COS_5_ValidUntil: '',
    COS_5_ActivityArea: [],
    COS_5_ActivityAreaInput: '',

    COS_6_RegistrationNumber: '',
    COS_6_DateFfIssue: '',
    COS_6_ValidUntil: '',
    COS_6_ActivityArea: [],
    COS_6_ActivityAreaInput: '',

    COS_7_RegistrationNumber: '',
    COS_7_DateFfIssue: '',
    COS_7_ValidUntil: '',
    COS_7_ActivityArea: [],
    COS_7_ActivityAreaInput: '',

    COS_8_RegistrationNumber: '',
    COS_8_DateFfIssue: '',
    COS_8_ValidUntil: '',
    COS_8_ActivityArea: [],
    COS_8_ActivityAreaInput: '',

    COS_9_RegistrationNumber: '',
    COS_9_DateFfIssue: '',
    COS_9_ValidUntil: '',
    COS_9_ActivityArea: [],
    COS_9_ActivityAreaInput: '',

  }

  handleSubmit = (e) => {
    e.preventDefault()
    const state = {...this.state};
    delete state.COS_1_ActivityAreaInput
    delete state.COS_2_ActivityAreaInput
    delete state.COS_3_ActivityAreaInput
    delete state.COS_4_ActivityAreaInput
    delete state.COS_5_ActivityAreaInput
    delete state.COS_6_ActivityAreaInput
    delete state.COS_7_ActivityAreaInput
    delete state.COS_8_ActivityAreaInput
    delete state.COS_9_ActivityAreaInput

    const errors = {};
    Object.keys(state)
      .filter(val => state[val] === "")
      .map(val => errors[val] = "required");
    Object.keys(state)
      .filter(val => isEmpty(state[val]) && isArray(state[val]))
      .map(val => errors[`${val}Input`] = "required");
    if (state["phone"].length !== 11) {
      errors["phone"] = "required";
    }
    if (!emailRegex.test(state["email"])) {
      errors["email"] = "required";
    }

    const firstInput = getFormInputs('mainPage')().find( input =>
      input.name && get(errors, input.name)
    )

    if(firstInput) {
      this.setState({
        firstError: firstInput.name,
        isSubmitting: true,
      })
    } else {
      const {
        fullNameOfTheTestWork, abbreviatedNameOfTheTestWork, email, phone,
        site, lastName, firstName, patronymic, country, zip, region,
        city, locality, street, homeOffice, services
      } = this.state;
      const COS = {}
      services.forEach((item, i) => {
          let obj = {}
          obj[`${item}_RegistrationNumber`] = this.state[`${item}_RegistrationNumber`]
          obj[`${item}_DateFfIssue`] = this.state[`${item}_DateFfIssue`]
          obj[`${item}_ValidUntil`] = this.state[`${item}_ValidUntil`]
          obj[`${item}_ActivityArea`] = this.state[`${item}_ActivityArea`]
          COS[`${item}`] = obj
      });

      const answer = {
        fullNameOfTheTestWork, abbreviatedNameOfTheTestWork, email, phone,
        site, lastName, firstName, patronymic, country, zip, region,
        city, locality, street, homeOffice, COS

      }
      console.log(answer);
    }

  }


  handleOnChangeInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      firstError: ""
     })
  }

  handleOnInputPhone = (phone) => {
    this.setState({
       phone,
       firstError: ""
      })
  }

  handleOnChangeRadio = ({ target }) => {
    this.setState({
      recognitionInTheSystem: target.value,
    });
  };

  handleOnChangeBox = (services) => {
    this.setState({
      services,
      isSubmitting: false,
      firstError: "",
    })
  }

  handleOnClickAdd = ({ target }) => {
    const array = this.state[target.dataset["name"]];
    const value = this.state[`${target.dataset["name"]}Input`];
    if (value) {
      array.push(value)
      this.setState({
        [target.dataset["name"]]: [...new Set(array)]
      })
    }
  }

  handleOnCLickRemove = ({ target }) => {
    let array = this.state[target.dataset["name"]];
    const id = target.dataset["id"];
    this.setState({[target.dataset["name"]]: array.filter(el => el !== id)})
  }

  render() {
    const { fullNameOfTheTestWork, abbreviatedNameOfTheTestWork, email, phone,
      site, lastName, firstName, patronymic, country, zip, region, city,
      locality, street, homeOffice, recognitionInTheSystem,
      isSubmitting, firstError, services } = this.state;


    const parametres1 = [
      { error: !fullNameOfTheTestWork.length,
        label: "Полное наименование испытательной лаборатории (центра)​",
        name: "fullNameOfTheTestWork", value: fullNameOfTheTestWork },
      { error: !abbreviatedNameOfTheTestWork.length,
        label: "Сокращенное наименование испытательной лаборатории (центра)​",
        name: "abbreviatedNameOfTheTestWork", value: abbreviatedNameOfTheTestWork },
      { error: !emailRegex.test(email), label: "Адрес электронной почты (общий)​", name: "email", value: email},
      { error: !(phone.length === 11), label: "Телефон", name: "phone", value: phone },
      { error: !site.length, label: "Сайт", name: "site", value: site },
    ]
    const parametres2 = [
      { error: !firstName.length, label: "Фамилия", name: "firstName", value: firstName },
      { error: !lastName.length, label: "Имя​", name: "lastName", value: lastName },
      { error: !patronymic.length, label: "Отчество", name: "patronymic", value: patronymic }
    ]

    const parametres3 = [
      { error: !country.length, label: "Страна", name: "country", value: country },
      { error: !zip.length, label: "Почтовый индекс", name: "zip", value: zip },
      { error: !region.length, label: "Регион/область", name: "region", value: region },
      { error: !city.length, label: "Город/район", name: "city", value: city },
      { error: !locality.length, label: "Населенный пункт", name: "locality", value: locality },
      { error: !street.length, label: "Улица", name: "street", value: street },
      { error: !homeOffice.length, label: "Дом и офис", name: "homeOffice", value: homeOffice }
    ]

    const parametres = [
      {parametres: parametres1, label: ""},
      {parametres: parametres2, label: "Руководитель"},
      {parametres: parametres3, label: "Фактический адрес"},
    ]

    const parametres4 = [
      { label: "Регистрационный номер свидетельства​", name: "RegistrationNumber" },
      { label: "Дата выдачи свидетельства​​", name: "DateFfIssue" },
      { label: "Действителен до​", name: "ValidUntil" },
    ]
    const options = [
      { value: "COS_1", label: "ЦОС «Системы менеджмента»​"},
      { value: "COS_2", label: "ЦОС «Инженерно-технические средства охраны, средства защиты и информации»​"},
      { value: "COS_3", label: "ЦОС «Трубная продукция»​"},
      { value: "COS_4", label: "ЦОС «Технологическое оборудование и материалы, энергетическое оборудование, приборы и средства автоматизации, вычислительная техника, программные средства»​"},
      { value: "COS_5", label: "ЦОС «Строительные материалы, работы (услуги)»​"},
      { value: "COS_6", label: "ЦОС «Производственная безопасность»​​"},
      { value: "COS_7", label: "ЦОС «Оборудование и материалы для сварки, неразрушающего контроля сварных соединений и врезки под давлением»​"},
      { value: "COS_8", label: "ЦОС «Запасные части и комплектующие для технического обслуживания и ремонта»"},
      { value: "COS_9", label: "ЦОС «Газ, конденсат, нефть, продукты их переработки»"},
    ];

    return (
      <div className="mainPage">
        <form name="mainPage" onSubmit={this.handleSubmit}>

          {parametres.map((el, index) =>
            <div className={`mainPage__section${index + 1}`} key={index}>
              <InputF
                label={el.label}
                parametres={el.parametres}
                className={`mainPage__input`}
                isSubmitting={isSubmitting}
                firstError={firstError}
                handleOnChangeInput={this.handleOnChangeInput}
                handleOnInputPhone={this.handleOnInputPhone}
                />
            </div>
          )}

          <div className="mainPage__section4">
            <div className="mainPage__subSection1">
              <h2>Признание в системе</h2>
              <Radio.Group onChange={this.handleOnChangeRadio} value={recognitionInTheSystem}>
                <Radio value={true}>
                  Есть
                </Radio>
                <Radio  value={false}>
                  Нет
                </Radio>
              </Radio.Group>
            </div>

            <div className="mainPage__subSection2" style={{display: recognitionInTheSystem ? 'block' : 'none'}}>
              <h2>Центральный орган системы, выдавший свидетельство испытательной лаборатории​</h2>
              <Checkbox.Group
                onChange={this.handleOnChangeBox}>
                {options.map((el, index) =>
                  <Row key={index}>
                    <Checkbox
                      style={{fontWeight: services.indexOf(el.value) !== -1 ? "bold" : "normal"}}
                      value={el.value}>
                      {el.label}
                    </Checkbox>
                    {services.indexOf(el.value) !== -1 ?
                      <>
                      {parametres4.map((element, i) =>
                        <InputWithScroll
                          key={i}
                          className={`mainPage__input-${el.value}`}
                          errorText="Заполните поле"
                          error={!this.state[`${el.value}_${element.name}`].length && isSubmitting}
                          firstError={firstError}
                          handleOnChange={this.handleOnChangeInput}
                          label={element.label}
                          name={`${el.value}_${element.name}`}
                          value={this.state[`${el.value}_${element.name}`]}
                          />
                        )
                      }
                      <div className={`mainPage__list-COS mainPage__list-${el.value}`}>
                          <div className={`mainPage__list-COS-wrapper mainPage__list-${el.value}-wrapper`}>
                            <InputWithScroll
                              className={`mainPage__list-input-${el.value}`}
                              errorText="Заполните поле"
                              error={isEmpty(this.state[`${el.value}_ActivityArea`]) && isSubmitting}
                              firstError={firstError}
                              handleOnChange={this.handleOnChangeInput}
                              label={"Область деятельности (ОК 034-2014)"}
                              name={`${el.value}_ActivityAreaInput`}
                              value={this.state[`${el.value}_ActivityAreaInput`]}
                            />
                            <span data-name={`${el.value}_ActivityArea`} onClick={this.handleOnClickAdd}>Добавить</span>
                          </div>
                        <div className="mainPage__list-result">
                          {this.state[`${el.value}_ActivityArea`].map((element, i) =>
                              <div key={i} data-id={element}>
                                <span data-id={element}>{element}</span>
                                <span data-name={`${el.value}_ActivityArea`} data-id={element} onClick={this.handleOnCLickRemove}
                                  className="delete">
                                  &#x2715;
                                </span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      </>
                      :
                      null
                    }
                  </Row>
                )}
              </Checkbox.Group>
            </div>
          </div>
          <Button type="primary" className="mainPage__submit" htmlType="submit">
            Сохранить
          </Button>
        </form>
      </div>
    );
  }
};
