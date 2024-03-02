"use client"

import { useContext } from "react"
import { PopupModal } from "react-calendly"

import { AppStateContext } from "@/app/(state)/reducer"

import { Button, type ButtonProps } from "./ui/button"

type CalendlyButtonProps = ButtonProps & { url: string }

export function CalendlyButton({
  onClick,
  url,
  children,
  ...otherProps
}: CalendlyButtonProps) {
  const { dispatch } = useContext(AppStateContext)

  const dispatchOpenPopup = () =>
    dispatch({ type: "calendlyPopUp", payload: { show: true, url } })

  const onClickWithCalendly: ButtonProps["onClick"] = (e) => {
    e.stopPropagation()
    dispatchOpenPopup()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button onClick={onClickWithCalendly} {...otherProps}>
      {children}
    </Button>
  )
}

export function CalendlyPopUpModal() {
  const { state, dispatch } = useContext(AppStateContext)
  const {
    calendlyPopUp: { show: showCalendlyPopup, url: calendlyUrl },
  } = state

  const dispatchPopUpClose = () =>
    dispatch({
      type: "calendlyPopUp",
      payload: { show: false },
    })

  const rootElement = typeof document !== "undefined" && document.body

  return rootElement ? (
    <PopupModal
      url={calendlyUrl}
      onModalClose={dispatchPopUpClose}
      open={showCalendlyPopup}
      rootElement={rootElement}
    />
  ) : null
}
