import * as React from 'react'
import { mount } from '@cypress/react'
import Home from './Home'


describe('The Search Bar', () => {
    it('loads successfully', () => {
        mount(<><Home/></>)
        cy.get('.search').should('exist')
    })
})

describe('Test Search Bar', () => {
    it('typing works', () => {
        mount(<><Home/></>)
        let search = cy.get('.search')
        let input = search.type('Hornet')
        input.should('exist')
    })
})
