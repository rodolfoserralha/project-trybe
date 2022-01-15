import React from 'react';

export default function formsPartTwo(onChange) {
  return (
    <>
      <label htmlFor="method-input">
        Método de pagamento:
        { ' ' }
        <select
          data-testid="method-input"
          id="method-input"
          name="method"
          onChange={ onChange }
          // value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="tag-input">
        Tag:
        { ' ' }
        <select
          data-testid="tag-input"
          name="tag"
          id="tag-input"
          onChange={ onChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    </>
  );
}
