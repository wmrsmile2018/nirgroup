import React, { Component } from 'react';
import get from 'lodash/get';
import { Button, Radio, Checkbox, Row, Input } from 'antd';

import InputWithScroll from '../components/InputWithScroll';
import InputF from './inputFields';
import './style.scss'

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
    agency: '',
    services: '',
    isSubmitting: false,
    active: false,
    recognitionInTheSystem: false,
    firstError: '',
    checkedValues: []
  }

  handleSubmit = (e) => {
    console.log('hello');
    e.preventDefault()
    this.setState({isSubmitting: true})

    const errors = {}
    Object.keys(this.state)
      .filter(val => this.state[val] === "")
      .map(val => errors[val] = "required")

    const firstInput = getFormInputs('mainPage')().find( input =>
      input.name && get(errors, input.name)
    )

    this.setState({firstError: firstInput.name})

  }


  handleOnChangeInput = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleOnChangeRadio = ({ target }) => {
    this.setState({
      recognitionInTheSystem: target.value,
    });
  };

  handleOnChangeBox = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.setState({checkedValues})
  }

  render() {
    const { fullNameOfTheTestWork, abbreviatedNameOfTheTestWork, email, phone,
      site, lastName, firstName, patronymic, country, zip, region, city,
      locality, street, homeOffice, recognitionInTheSystem, agency, services,
      isSubmitting, firstError, checkedValues } = this.state;


    const parametres1 = [
      { error: !fullNameOfTheTestWork.length,
        label: "Полное наименование испытательной лаборатории (центра)​",
        name: "fullNameOfTheTestWork", value: fullNameOfTheTestWork },
      { error: !abbreviatedNameOfTheTestWork.length,
        label: "Сокращенное наименование испытательной лаборатории (центра)​",
        name: "abbreviatedNameOfTheTestWork", value: abbreviatedNameOfTheTestWork },
      { error: !email.length, label: "Адрес электронной почты (общий)​", name: "email", value: email},
      { error: !phone.length === 11, label: "Телефон", name: "phone", value: phone },
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
            <div className={`mainPage__section${index}`} key={index}>
              <InputF
                label={el.label}
                parametres={el.parametres}
                className={`mainPage__input`}
                isSubmitting={isSubmitting}
                firstError={firstError}
                handleOnChangeInput={this.handleOnChangeInput}
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
                  <Row>
                    <Checkbox value={el.value}>{el.label}</Checkbox>
                    {checkedValues.indexOf(el.value) !== -1 ?
                      <>
                        <Input/>
                        <Input/>
                        <Input/>
                        <Input/>

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
