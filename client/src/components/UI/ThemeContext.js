import React from "react";
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './theme';

const ThemeToggleContext = React.createContext({
    toggle: () => { }
});
export const useTheme = () => React.useContext(ThemeToggleContext);

const Wrapper = styled.div`
    background-color: ${backgroundColor};
    border: 1px solid ${backgroundColor};
    color: ${textColor};`;


export const MyThemeProvider = ({ children }) => {
    const [themeState, setThemeState] = React.useState({
        mode: 'light'
    });
    const toggle = () => {
        const mode = (themeState.mode === 'light'
            ? `dark`
            : `light`);
        setThemeState({ mode: mode });
    };
    return (
        <ThemeToggleContext.Provider
            value={{ toggle: toggle }}
        >
            <ThemeProvider
                theme={{
                    mode: themeState.mode
                }}
            >
                <Wrapper>
                    {children}
                </Wrapper>
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};