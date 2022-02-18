import * as React from 'react'
import { mount } from '@cypress/react'
import TeamTable from './TeamTable'


describe('The NBA Team Table Test', () => {
    it('contains 3 example teams', () => {
        const exTeam = [
            {abbreviation: "ATL", city: "Atlanta", conference: "East", division: "Southeast", full_name: "Atlanta Hawks", id: 1, name: "Hawks"},
            {abbreviation: "MIA", city: "Miami", conference: "East", division: "Southeast", full_name: "Miami Heat", id: 16, name: "Heat"},
            {abbreviation: "GSW", city: "Golden State", conference: "West", division: "Pacific", full_name: "Golden State Warriors", id: 10, name: "Warriors"},

        ]
        mount(<><TeamTable teamInfo={exTeam}/></>)
        cy.get('.react-bootstrap-table').should('exist')
        cy.get('tbody>tr').should('have.length', 3)
    })
})

