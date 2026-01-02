import styled from "styled-components";

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px 12px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
    &::placeholder {
        color: #aaa;
    }
`;
