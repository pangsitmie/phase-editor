import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, } from "./redux/store";

import { StyledIconButton } from "./components/styles/IconButton.styled";
import { H4 } from "./components/styles/H4.styled";
import { StyledPage } from "./components/styles/Page.styled";
import { RootState } from "./redux/reducers";
import { createPageAsync, renamePage, selectPage } from "./redux/pagesSlice";
import { CgHashtag } from 'react-icons/cg';
import { StyledInput } from "./components/styles/Input.styled";
import { useState } from "react";
import { deletePage } from "./redux/pagesSlice";



const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;

const Pages = () => {
    const pages = useSelector((state: RootState) => Object.values(state.pages.entities));
    const selectedPageId = useSelector((state: RootState) => state.pages.selectedPageId);

    const dispatch = useDispatch<AppDispatch>();
    const handlePageSelect = (pageId: string) => {
        dispatch(selectPage(pageId));
    };


    const handleCreatePage = () => {
        console.log('handleCreatePage');
        dispatch(createPageAsync());
    };



    // HANDLE RENAME
    const [editingPageId, setEditingPageId] = useState<string | null>(null);

    const handlePageRename = (pageId: string) => {
        setEditingPageId(pageId); // Set the page ID as the editing page
    };


    const updatePageName = (e: React.ChangeEvent<HTMLInputElement>, pageId: string) => {
        // Update the page name in the Redux state
        dispatch(renamePage({ pageId: pageId, name: e.target.value }));
    };

    const handlePageNameBlur = () => {
        setEditingPageId(null); // Clear the editing state when blurring the input field
    };

    const handleDeletePage = (pageId: string) => {
        console.log('handleRemovePage');
        dispatch(deletePage(pageId));
    };

    return (
        <PagesWrapper>
            <div className="flex gap-4 justify-between mb-4">
                <H4>Pages</H4>
                <StyledIconButton onClick={handleCreatePage}>
                    +
                </StyledIconButton>
            </div>

            {pages.map((page) => (
                <StyledPage
                    key={page.id}
                    onClick={() => handlePageSelect(page.id)}
                    onDoubleClick={() => handlePageRename(page.id)}
                    className={page.id === selectedPageId ? 'active' : ''} // if the element is selected, add the active class
                >
                    <div className="flex justify-between">
                        <div className="flex items-center justify-left">
                            <CgHashtag className="mr-2" />
                            {editingPageId === page.id ?
                                (
                                    <StyledInput
                                        type="text"
                                        value={page.name}
                                        autoFocus
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePageName(e, page.id)}
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
                                ) :
                                (
                                    <>
                                        {page.id === selectedPageId ? <strong>{page.name}</strong> : <div>{page.name}</div>}
                                    </>
                                )
                            }
                        </div>
                        <StyledIconButton
                            onClick={() => handleDeletePage(page.id)}
                            className="text-[#484848] hover:text-white">
                            -
                        </StyledIconButton>
                    </div>
                </StyledPage>
            ))}
        </PagesWrapper >
    )
}

export default Pages