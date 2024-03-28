import {render, screen, waitFor} from "@testing-library/react";
import IndexPage, { getStaticProps } from "dh-marvel/pages/index.page";
import { getComics } from "dh-marvel/services/marvel/marvel.service";

jest.mock("dh-marvel/services/marvel/marvel.service");

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', async () => { 
            const initialComics = [
                { 
                    id: 1, 
                    title: 'Comic 1', 
                    description: 'Description 1',
                    thumbnail: { path: 'path/to/thumbnail1', extension: 'jpg' }
                },
                { 
                    id: 2, 
                    title: 'Comic 2', 
                    description: 'Description 2',
                    thumbnail: { path: 'path/to/thumbnail2', extension: 'jpg' }
                },
            ];
            (getComics as jest.Mock).mockResolvedValueOnce(initialComics);
            render(<IndexPage initialComics={initialComics} />)
            await waitFor(() => { 
                const title = screen.getByText('Comics') 
                expect(title).toBeInTheDocument()
            })
        })
        it('should render comics', async () => { 
    const initialComics = [
        { 
            id: 1, 
            title: 'Comic 1', 
            description: 'Description 1',
            thumbnail: { path: 'path/to/thumbnail1', extension: 'jpg' }
        },
        { 
            id: 2, 
            title: 'Comic 2', 
            description: 'Description 2',
            thumbnail: { path: 'path/to/thumbnail2', extension: 'jpg' }
        },
    ];
    (getComics as jest.Mock).mockResolvedValueOnce(initialComics);
    render(<IndexPage initialComics={initialComics} />)
    await waitFor(() => { 
        const comic1Title = screen.getByText('Comic 1') 
        expect(comic1Title).toBeInTheDocument()

        const comic2Title = screen.getByText('Comic 2') 
        expect(comic2Title).toBeInTheDocument()
    })
})
    })
})