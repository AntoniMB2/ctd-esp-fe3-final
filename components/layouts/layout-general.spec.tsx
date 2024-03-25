import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

jest.mock('dh-marvel/components/layouts/header/general-header.component', () => {
    const MockHeader = () => <div>Header</div>;
    MockHeader.displayName = 'MockHeader';
    return MockHeader;
});

jest.mock('dh-marvel/components/layouts/footer/general-footer.component', () => () => {
    const MockFooter = () => <div>Footer</div>;
    MockFooter.displayName = 'MockFooter'; 
    return MockFooter;
});

describe('LayoutGeneral', () => {
    describe('when rendering default', () => {
        it('should render the children', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const children = screen.getByText('children')
            expect(children).toBeInTheDocument()
        })
        it('should render the header', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const header = screen.getByText('Header')
            expect(header).toBeInTheDocument()
        })
        it('should render the footer', () => {
            render(<LayoutGeneral><p>children</p></LayoutGeneral>)
            const footer = screen.getByText('Footer')
            expect(footer).toBeInTheDocument()
        })
    })
})