import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState, selectPageAndFirstElement } from "./redux/store";
import { createPage, updatePageName } from "./redux/pagesSlice";
import { StyledAddButton } from "./components/styles/AddButton.styled";
import { H4 } from "./components/styles/H4.styled";
import { StyledPage } from "./components/styles/Page.styled";
import { useState } from "react";
import { StyledInput } from "./components/styles/Input.styled";
import { Page } from "./interfaces";
import { CgHashtag } from 'react-icons/cg';


const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;

const Pages = () => {
    const pages = useSelector((state: RootState) => state.pages.list);
    const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);
    const dispatch: AppDispatch = useDispatch();

    const handleCreatePage = () => {
        const newPageName = `Page ${pages.length + 1}`;
        dispatch(createPage(newPageName));
    };


    const [editingPageId, setEditingPageId] = useState<string | null>(null);

    const handlePageSelect = (pageId: string) => {
        setEditingPageId(null); // Clear the editing state when selecting a new page
        dispatch(selectPageAndFirstElement(pageId));
        console.log(`Current page ID in Redux: ${pageId}`);
    };

    const handlePageRename = (pageId: string) => {
        setEditingPageId(pageId); // Set the page ID as the editing page
    };

    const handlePageNameChange = (e: React.ChangeEvent<HTMLInputElement>, pageId: string) => {
        // Update the page name in the Redux state
        dispatch(updatePageName({ id: pageId, name: e.target.value }));
    };

    const handlePageNameBlur = () => {
        setEditingPageId(null); // Clear the editing state when blurring the input field
    };

    return (
        <PagesWrapper>
            <div className="flex gap-4 justify-between mb-4">
                <H4>Pages</H4>
                <StyledAddButton
                    onClick={handleCreatePage}
                >
                    +
                </StyledAddButton>
            </div>


            {pages.map((page: Page) => (
                <StyledPage
                    key={page.id}
                    className={page.id === selectedPageId ? 'active' : ''} // if the element is selected, add the active class
                    onClick={() => handlePageSelect(page.id)}
                    onDoubleClick={() => handlePageRename(page.id)}
                >
                    {editingPageId === page.id ? (
                        <StyledInput
                            type="text"
                            value={page.name}
                            autoFocus
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePageNameChange(e, page.id)}
                            onBlur={handlePageNameBlur}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter') {
                                    // Check if the target is an input field and blur it
                                    if (e.currentTarget instanceof HTMLInputElement) {
                                        e.currentTarget.blur();
                                    }
                                }
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-left">
                            <CgHashtag className="mr-2" />
                            <span>
                                {page.id === selectedPageId ? <strong>{page.name}</strong> : page.name}
                            </span>

                        </div>
                    )}
                </StyledPage>
            ))}
        </PagesWrapper>
    )
}

export default Pages