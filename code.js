/**
 * Copyright (c) 2020 Bruno Buccolo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Obtém dados do Tesouro Direto
 *
 * @param {"Tesouro Selic 2025"} titulo O nome do título do qual se deseja obter as informações.
 *
 * @param {"preco_venda"} campo Determina qual informação se deseja obter.
 *
 * @return {string|number} A informação desejada.
 * @customFunction
 */
function TESOURODIRETO(titulo, campo) {
  return getTesouroData(titulo, campo);
}

/**
 * Obtém dados do Tesouro Direto
 *
 * @param {"Tesouro Selic 2025"} titulo O nome do título do qual se deseja obter as informações.
 *
 * @param {"preco_venda"} campo Determina qual informação se deseja obter.
 *
 * @param {"01/01/2017"} data_inicio Data inicial da consulta.
 *
 * @param {"01/01/2019"} data_final Data final da consulta.
 *
 * @return {string|number} A informação desejada.
 * @customFunction
 */
function TESOURODIRETOHIST(titulo, campo, data_inicio, data_final) {
  return getTesouroData(titulo, campo, data_inicio, data_final);
}

/**
 * Obtém o valor atual de um CDB.
 *
 * @param {1000} investimento_inicial O valor do investimento inicial. Exemplo: `1000,00`
 *
 * @param {115%} rentabilidade Rentabilidade anual em função do CDI. Exemplo: `115%`
 *
 * @param {"01/01/2017"} data_inicial Data inicial do investimento. Exemplo: `"01/01/2017"
 *
 * @return {number} O valor atual do CDB.
 * @customFunction
 */
function CDB(investimento_inicial, rentabilidade, data_inicial) {
  return getRendaFixaData(
    "cdb",
    investimento_inicial,
    rentabilidade,
    data_inicial
  );
}

/**
 * Obtém o valor atual de um CDB prefixado.
 *
 * @param {1000} investimento_inicial O valor do investimento inicial. Exemplo: `1000,00`
 *
 * @param {9%} rentabilidade Rentabilidade anual contratada. Exemplo: `9%`
 *
 * @param {"01/01/2017"} data_inicial Data inicial do investimento. Exemplo: `"01/01/2017"
 *
 * @return {number} O valor atual do CDB.
 * @customFunction
 */
function CDBPRE(investimento_inicial, rentabilidade, data_inicial) {
  return getRendaFixaData(
    "cdb-pre",
    investimento_inicial,
    rentabilidade,
    data_inicial
  );
}

/**
 * Obtém o valor atual de uma LCA.
 *
 * @param {1000} investimento_inicial O valor do investimento inicial. Exemplo: `5000,00`
 *
 * @param {94,5%} rentabilidade Rentabilidade anual em função do CDI. Exemplo: `94,5%`.
 *
 * @param {"01/01/2017"} data_inicial Data inicial do investimento. Exemplo: `"01/01/2017"`
 *
 * @return {number} O valor atual da LCA.
 * @customFunction
 */
function LCA(investimento_inicial, rentabilidade, data_inicial) {
  return getRendaFixaData(
    "lca",
    investimento_inicial,
    rentabilidade,
    data_inicial
  );
}

/**
 * Obtém o valor atual de uma LCI.
 *
 * @param {1000} investimento_inicial O valor do investimento inicial. Exemplo: `2000,00`
 *
 * @param {97%} rentabilidade Rentabilidade anual em função do CDI. Exemplo: `97%`.
 *
 * @param {"01/01/2017"} data_inicial Data inicial do investimento. Exemplo: `"01/01/2017"`
 *
 * @return {number} O valor atual da LCI.
 * @customFunction
 */
function LCI(investimento_inicial, rentabilidade, data_inicial) {
  return getRendaFixaData(
    "lci",
    investimento_inicial,
    rentabilidade,
    data_inicial
  );
}

/**
 * Obtém dados fundamentalistas de acoes da B3
 *
 * @param {ABEV3} ticker O ticker da empresa. Exemplo: `ABEV3`
 *
 * @param {P/L} field O campo desejado. Exemplo: `P/L`.
 *
 * @return {string|number} O dado desejado.
 * @customFunction
 */
function FUN(ticker, field) {
  return getStockData(ticker, field);
}

function getStockData(ticker, field) {
  return JSON.parse(
    UrlFetchApp.fetch(
      "https://pafuncio.herokuapp.com/stocks/" +
        ticker +
        "?field=" +
        encodeURIComponent(field)
    ).getContentText()
  ).data;
}

function getRendaFixaData(
  investment_type,
  initial_investment,
  rate,
  initial_date
) {
  if (initial_date instanceof Date) {
    var day = initial_date.getDate();
    var month = initial_date.getMonth() + 1;
    var year = initial_date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    initial_date = day + "/" + month + "/" + year;
  }

  return JSON.parse(
    UrlFetchApp.fetch(
      "https://app.grana.io/api/fixed_income?email=" +
        getCurrentUserEmail() +
        "&investment_type=" +
        encodeURIComponent(investment_type) +
        "&initial_date=" +
        encodeURIComponent(initial_date) +
        "&rate=" +
        encodeURIComponent(rate) +
        "&initial_investment=" +
        encodeURIComponent(initial_investment)
    ).getContentText()
  ).data;
}

function getTesouroData(bond, field, initialDate, finalDate) {
  if (finalDate instanceof Date) {
    var day = finalDate.getDate();
    var month = finalDate.getMonth() + 1;
    var year = finalDate.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    finalDate = day + "/" + month + "/" + year;
  }

  if (initialDate instanceof Date) {
    var day = initialDate.getDate();
    var month = initialDate.getMonth() + 1;
    var year = initialDate.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    initialDate = day + "/" + month + "/" + year;
  }

  return JSON.parse(
    UrlFetchApp.fetch(
      "https://app.grana.io/api/tesouro?email=" +
        getCurrentUserEmail() +
        "&bond=" +
        encodeURIComponent(bond) +
        "&field=" +
        encodeURIComponent(field) +
        "&initial_date=" +
        encodeURIComponent(initialDate) +
        "&final_date=" +
        encodeURIComponent(finalDate)
    ).getContentText()
  ).data;
}

function getCurrentUserEmail() {
  var currentUserEmail = "";

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var owner = ss.getOwner();
    currentUserEmail = owner.getEmail();
  } catch (e) {
    currentUserEmail = e.message;
  }

  return currentUserEmail;
}
