import React from 'react'
import Component from '@reach/component-component'
import Portal from '@reach/portal'
import { checkStyles, wrapEvent, assignRef } from '@reach/utils'
import FocusLock from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'
import { func, bool } from 'prop-types'
import styled from '@emotion/styled'

const DialogOverlayElement = styled.div`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`

const DialogContentElement = styled.div`
  width: 50vw;
  margin: 10vh auto;
  background: white;
  padding: 2rem;
  outline: none;
`

let createAriaHider = dialogNode => {
  let originalValues = []
  let rootNodes = []

  Array.prototype.forEach.call(document.querySelectorAll('body > *'), node => {
    if (node === dialogNode.parentNode) {
      return
    }
    let attr = node.getAttribute('aria-hidden')
    let alreadyHidden = attr !== null && attr !== 'false'
    if (alreadyHidden) {
      return
    }
    originalValues.push(attr)
    rootNodes.push(node)
    node.setAttribute('aria-hidden', 'true')
  })

  return () => {
    rootNodes.forEach((node, index) => {
      let originalValue = originalValues[index]
      if (originalValue === null) {
        node.removeAttribute('aria-hidden')
      } else {
        node.setAttribute('aria-hidden', originalValue)
      }
    })
  }
}

let k = () => {}

let checkDialogStyles = () => checkStyles('dialog')

let portalDidMount = refs => {
  refs.disposeAriaHider = createAriaHider(refs.overlayNode)
}

let contentWillUnmount = ({ refs }) => {
  refs.disposeAriaHider()
}

let DialogOverlay = React.forwardRef(
  (
    {
      isOpen = true,
      onDismiss = k,
      initialFocusRef,
      onClick,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => (
    <Component didMount={checkDialogStyles}>
      {isOpen ? (
        <Portal data-reach-dialog-wrapper>
          <Component
            refs={{ overlayNode: null }}
            didMount={({ refs }) => {
              portalDidMount(refs)
            }}
            willUnmount={contentWillUnmount}
          >
            {({ refs }) => (
              <FocusLock
                returnFocus
                onActivation={() => {
                  if (initialFocusRef) {
                    initialFocusRef.current.focus()
                  }
                }}
              >
                <RemoveScroll>
                  <DialogOverlayElement
                    onClick={wrapEvent(onClick, event => {
                      event.stopPropagation()
                      onDismiss()
                    })}
                    onKeyDown={wrapEvent(onKeyDown, event => {
                      if (event.key === 'Escape') {
                        event.stopPropagation()
                        onDismiss()
                      }
                    })}
                    ref={node => {
                      refs.overlayNode = node
                      assignRef(forwardedRef, node)
                    }}
                    {...props}
                  />
                </RemoveScroll>
              </FocusLock>
            )}
          </Component>
        </Portal>
      ) : null}
    </Component>
  )
)

DialogOverlay.propTypes = {
  initialFocusRef: () => {},
}

let stopPropagation = event => event.stopPropagation()

let DialogContent = React.forwardRef(
  ({ onClick, onKeyDown, ...props }, forwardedRef) => (
    <DialogContentElement
      aria-modal="true"
      data-reach-dialog-content
      tabIndex="-1"
      onClick={wrapEvent(onClick, stopPropagation)}
      ref={node => {
        assignRef(forwardedRef, node)
      }}
      {...props}
    />
  )
)

let Dialog = ({ isOpen, onDismiss = k, initialFocusRef, ...props }) => (
  <DialogOverlay
    isOpen={isOpen}
    onDismiss={onDismiss}
    initialFocusRef={initialFocusRef}
  >
    <DialogContent {...props} />
  </DialogOverlay>
)

Dialog.propTypes = {
  isOpen: bool,
  onDismiss: func,
}

export { DialogOverlay, DialogContent, Dialog }
