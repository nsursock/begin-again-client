import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import RichTextEditor from "react-rte";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      user: auth().currentUser,
      title: null,
      experience: "Beginner",
      about: RichTextEditor.createEmptyValue(),
      city: null,
      country: "Afghanistan",
      schedule: "Part-time",
      closingDate: null,
      salaryLow: null,
      salaryHigh: null,
      currency: "USD",
      symbol: "$",
      website: null,
      company: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeRTE = (value) => {
    this.setState({ about: value });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.id.startsWith("currency")) {
      let ccy = document.querySelector(`#${event.target.id} option:checked`);
      this.setState({
        symbol: ccy.dataset.symbol,
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: null });
    try {
      await db.ref("jobs").push({
        title: this.state.title,
        experience: this.state.experience,
        description: this.state.about.toString("html"),
        city: this.state.city,
        country: this.state.country,
        schedule: this.state.schedule,
        closingDate: this.state.closingDate,
        salaryLow: this.state.salaryLow,
        salaryHigh: this.state.salaryHigh,
        currency: this.state.currency,
        company: this.state.company,
        website: this.state.website,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.props.history.push("/jobs");
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div class="m-8">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={this.handleSubmit}>
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="title"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        onChange={this.handleChange}
                        value={this.state.title}
                        type="text"
                        name="title"
                        id="title"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="experience"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Experience
                      </label>
                      <select
                        onChange={this.handleChange}
                        value={this.state.experience}
                        id="experience"
                        name="experience"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Expert</option>
                      </select>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="city"
                        class="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        onChange={this.handleChange}
                        value={this.state.city}
                        type="text"
                        name="city"
                        id="city"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="country"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        onChange={this.handleChange}
                        value={this.state.country}
                        id="country"
                        name="country"
                        autocomplete="country"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Afganistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua & Barbuda">
                          Antigua & Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire">Bonaire</option>
                        <option value="Bosnia & Herzegovina">
                          Bosnia & Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Ter">
                          British Indian Ocean Ter
                        </option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Channel Islands">Channel Islands</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos Island">Cocos Island</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote DIvoire">Cote DIvoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curaco">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">
                          Falkland Islands
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Ter">
                          French Southern Ter
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="India">India</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea Sout">Korea South</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Midway Islands">Midway Islands</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nambia">Nambia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherland Antilles">
                          Netherland Antilles
                        </option>
                        <option value="Netherlands">
                          Netherlands (Holland, Europe)
                        </option>
                        <option value="Nevis">Nevis</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau Island">Palau Island</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Phillipines">Philippines</option>
                        <option value="Pitcairn Island">Pitcairn Island</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Republic of Montenegro">
                          Republic of Montenegro
                        </option>
                        <option value="Republic of Serbia">
                          Republic of Serbia
                        </option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Barthelemy">St Barthelemy</option>
                        <option value="St Eustatius">St Eustatius</option>
                        <option value="St Helena">St Helena</option>
                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="St Maarten">St Maarten</option>
                        <option value="St Pierre & Miquelon">
                          St Pierre & Miquelon
                        </option>
                        <option value="St Vincent & Grenadines">
                          St Vincent & Grenadines
                        </option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Samoa American">Samoa American</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome & Principe">
                          Sao Tome & Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad & Tobago">
                          Trinidad & Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks & Caicos Is">
                          Turks & Caicos Is
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Erimates">
                          United Arab Emirates
                        </option>
                        <option value="United States of America">
                          United States of America
                        </option>
                        <option value="Uraguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City State">
                          Vatican City State
                        </option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (Brit)">
                          Virgin Islands (Brit)
                        </option>
                        <option value="Virgin Islands (USA)">
                          Virgin Islands (USA)
                        </option>
                        <option value="Wake Island">Wake Island</option>
                        <option value="Wallis & Futana Is">
                          Wallis & Futana Is
                        </option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="country"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Schedule
                      </label>
                      <select
                        onChange={this.handleChange}
                        value={this.state.schedule}
                        id="schedule"
                        name="schedule"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Part-time</option>
                        <option>Full-time</option>
                        <option>40+ hours a week</option>
                      </select>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="expires-on"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Closing Date
                      </label>
                      <input
                        onChange={this.handleChange}
                        value={this.state.closingDate}
                        type="date"
                        name="closingDate"
                        id="expires-on"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <div>
                        <label
                          for="salary-low"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Salary Low
                        </label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 sm:text-sm">
                              {this.state.symbol}
                            </span>
                          </div>
                          <input
                            onChange={this.handleChange}
                            value={this.state.salaryLow}
                            type="text"
                            name="salaryLow"
                            id="salary-low"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                          <div class="absolute inset-y-0 right-0 flex items-center">
                            <label for="currency" class="sr-only">
                              Currency
                            </label>
                            <select
                              onChange={this.handleChange}
                              value={this.state.currency}
                              id="currency1"
                              name="currency"
                              class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                            >
                              <option data-symbol="$" data-placeholder="0.00">
                                USD
                              </option>
                              <option data-symbol="€" data-placeholder="0.00">
                                EUR
                              </option>
                              <option data-symbol="£" data-placeholder="0.00">
                                GBP
                              </option>
                              <option data-symbol="¥" data-placeholder="0">
                                JPY
                              </option>
                              <option data-symbol="$" data-placeholder="0.00">
                                CAD
                              </option>
                              <option data-symbol="$" data-placeholder="0.00">
                                AUD
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <div>
                        <label
                          for="salary-high"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Salary High
                        </label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 sm:text-sm">
                              {this.state.symbol}
                            </span>
                          </div>
                          <input
                            onChange={this.handleChange}
                            value={this.state.salaryHigh}
                            type="text"
                            name="salaryHigh"
                            id="salary-high"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                          <div class="absolute inset-y-0 right-0 flex items-center">
                            <label for="currency" class="sr-only">
                              Currency
                            </label>
                            <select
                              onChange={this.handleChange}
                              value={this.state.currency}
                              id="currency2"
                              name="currency"
                              class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                            >
                              <option data-symbol="$" data-placeholder="0.00">
                                USD
                              </option>
                              <option data-symbol="€" data-placeholder="0.00">
                                EUR
                              </option>
                              <option data-symbol="£" data-placeholder="0.00">
                                GBP
                              </option>
                              <option data-symbol="¥" data-placeholder="0.00">
                                JPY
                              </option>
                              <option data-symbol="$" data-placeholder="0.00">
                                CAD
                              </option>
                              <option data-symbol="$" data-placeholder="0.00">
                                AUD
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="company"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <input
                        onChange={this.handleChange}
                        value={this.state.company}
                        type="text"
                        name="company"
                        id="company"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <label
                        for="website"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          onChange={this.handleChange}
                          value={this.state.website}
                          type="text"
                          name="website"
                          id="website"
                          class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div class="mt-1">
                      <RichTextEditor
                        onChange={this.handleChangeRTE}
                        value={this.state.about}
                        id="about"
                        name="about"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Brief description for your posting. URLs are hyperlinked.
                    </p>
                  </div>

                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                    {this.state.error ? (
                      <p class="text-xs text-red-600">{this.state.error}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
