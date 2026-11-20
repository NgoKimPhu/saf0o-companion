import styled from 'styled-components'

export const ClusterBoxMain = styled.section`
  position: relative;
  border-top: 1px solid var(--saf0o-border-subtle);
  color: var(--saf0o-text-primary);
  background: transparent;

  &:first-child {
    border-top: 0;
  }
`

export const ClusterBoxLabel = styled.div`
  display: flex;
  min-height: 38px;
  padding: 0 16px;
  align-items: center;
  color: var(--saf0o-text-tertiary);
  font-size: 12px;
  font-weight: 560;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const Cluster = styled.div`
  display: flow-root;
  color: inherit;
  background: transparent;
`

export const ClusterValue = styled.div`
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  color: inherit;
  background: transparent;
`

export const ClusterInputLabel = styled.div`
  display: flex;
  width: 60px;
  align-items: center;
  justify-content: center;
`

export const ClusterColumn = styled.div`
  display: flex;
  min-width: 0;
  flex: 1 1 0;
  flex-direction: column;
`

export const ClusterRow = styled.div`
  display: flex;
  min-width: 0;
  align-items: stretch;
  border-top: 1px solid var(--saf0o-border-subtle);

  &:first-child {
    border-top: 0;
  }
`

export const ClusterTag = styled.div`
  padding: 8px 12px;
  color: var(--saf0o-text-tertiary);
  font-size: 12px;
  text-align: center;
`

export const ClusterFocus = styled.div`
  padding: 16px 12px;
  color: var(--saf0o-text-secondary);
  font-size: 13px;
  line-height: 20px;
  text-align: center;
`

export const ClusterFocusHighlight = styled.div`
  color: var(--saf0o-success);
  font-size: 15px;
`

export const ClusterAddress = styled.div`
  padding: 12px;
  font-size: 14px;
  font-weight: 560;
`

export const ClusterAddressRecipient = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  font-family: var(--saf0o-font-mono);
  font-size: 13px;
`

export const ClusterAddressRecipientFull = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--saf0o-text-primary);
  background: var(--saf0o-surface-hover);
  opacity: 0;
  transition: opacity var(--saf0o-motion-fast) var(--saf0o-ease);

  &:hover,
  &:focus-within {
    opacity: 1;
  }
`

export const ClusterFira = styled.div`
  font-family: var(--saf0o-font-mono);
  font-size: 13px;
`
