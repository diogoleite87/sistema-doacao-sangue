import themeLight from "../theme/light";
import themeDark from "../theme/dark";

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../schemas/models";

interface DarkModeContextProps {
    themeName: Theme
    toggleTheme: (theme: Theme) => void
}

interface DarkModeProviderContextProps {
    children?: ReactNode
}

const DarkModeContext = createContext<DarkModeContextProps>({} as DarkModeContextProps)

function DarkModeContextProvider({ children }: DarkModeProviderContextProps) {

    const [themeName, setThemeName] = useState<Theme>('light')

    const loadThemeDataStorage = async () => {
        const theme = localStorage.getItem('@Theme')

        if (theme) {
            setThemeName(theme as Theme)
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setThemeName('dark')
                localStorage.setItem('@Theme', 'dark')
            } else {
                setThemeName('light')
                localStorage.setItem('@Theme', 'light')
            }
        }
    }

    const toggleTheme = useCallback((theme: Theme) => {
        setThemeName(theme)
        localStorage.setItem('@Theme', theme)
    }, [])

    const theme = useMemo(() => {
        if (themeName === 'light') {
            return themeLight
        } else {
            return themeDark
        }
    }, [themeName])

    useEffect(() => {
        loadThemeDataStorage()
    }, [])

    return (
        <DarkModeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    )
}

export { DarkModeContextProvider }
export default DarkModeContext