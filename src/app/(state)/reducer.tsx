"use client"

import { createContext, useReducer, type Dispatch, type ReactNode } from "react"

import { siteConfig } from "@/config/site"

export type AppState = {
  calendlyPopUp: {
    show: boolean
    url: string
  }
}

type CalendlyPopUpAction = {
  type: "calendlyPopUp"
  payload: {
    /**
     * Determines whether the Calendly modal is shown.
     */
    show: boolean
    /**
     * URL for the modal to show information from. URL is for a web link to any
     * point in the Calendly flow, not an API endpoint.
     *
     * @default siteConfig.links.calendly.default
     */
    url?: string
  }
}

export type AppActions = CalendlyPopUpAction

export function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case "calendlyPopUp": {
      const { show, url } = action.payload
      return {
        ...state,
        calendlyPopUp: { show, url: url ?? siteConfig.links.calendly.default },
      }
    }
    default: {
      return state
    }
  }
}

export const initialState: AppState = {
  calendlyPopUp: {
    show: false,
    url: siteConfig.links.calendly.default,
  },
}

export const AppStateContext = createContext<
  | {
      state: AppState
      dispatch: Dispatch<AppActions>
    }
  | Record<string, never>
>({})

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}
