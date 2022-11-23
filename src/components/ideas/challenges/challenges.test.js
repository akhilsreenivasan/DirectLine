import { render, screen } from '@testing-library/react';
import Challenges from './challenges';

describe('submit employee id', ()=> {
    test('check createdby field', () => {
        let user = {name:'Joe', id:1500};
        let data = [ { id: 1, title: 'One', description: 'Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description', tags: ['name', 'two', 'three'], userId: 1500, creationDate: 1645266448714, userName: 'Joe', votedList: [1500, 1503] }];
        render(<Challenges hackdata={data} user={user}/>);
        const textFinder = screen.getByText(/CreatedBy/i);
        expect(textFinder).toBeInTheDocument();
      });
    test('check Name Rendered Properly', () => {
        let user = {name:'Joe', id:1500};
        let data = [ { id: 1, title: 'One', description: 'Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description', tags: ['name', 'two', 'three'], userId: 1500, creationDate: 1645266448714, userName: 'Joe', votedList: [1500, 1503] }];
        render(<Challenges hackdata={data} user={user}/>);
        const textFinder = screen.getByText(/Joe/i);
        const textFinder1 = screen.getByText(/One/i);
        expect(textFinder).toBeInTheDocument();
        expect(textFinder1).toBeInTheDocument();
      });
})
