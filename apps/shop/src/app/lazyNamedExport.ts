import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export function lazyNamedExport<
  TModule,
  TExport extends keyof TModule,
  TComponent extends ComponentType<unknown> = Extract<
    TModule[TExport],
    ComponentType<unknown>
  >
>(
  importFn: () => Promise<TModule>,
  exportName: TExport
): LazyExoticComponent<TComponent> {
  return lazy(async () => {
    const module = await importFn();

    return { default: module[exportName] as TComponent };
  });
}
