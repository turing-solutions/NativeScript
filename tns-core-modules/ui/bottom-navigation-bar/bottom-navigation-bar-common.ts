// Types
import { BottomNavigationBar as BottomNavigationBarDefinition } from ".";
import { TabContentItem } from "../tab-navigation-base/tab-content-item";
import { View, ViewBase } from "../core/view";

// Requires
import { TabNavigationBase } from "../tab-navigation-base/tab-navigation-base";
import { CSSType } from "../core/view";

// TODO: Import only partial stuff from tab-navigation-base?
export * from "../tab-navigation-base/tab-navigation-base";
export * from "../tab-navigation-base/tab-strip";
export * from "../tab-navigation-base/tab-strip-item";

export const traceCategory = "TabView";

export module knownCollections {
    export const items = "items";
}

@CSSType("BottomNavigationBar")
export class BottomNavigationBarBase extends TabNavigationBase implements BottomNavigationBarDefinition {
    
    public _addArrayFromBuilder(name: string, value: Array<any>): void {
        // BottomNavigationBar doesn't have items
    }

    public _addChildFromBuilder(name: string, value: any): void {
        if (name === "TabStrip") {
            this.tabStrip = value;
        }
    }

    get _selectedView(): View {
        return null;
    }

    get _childrenCount(): number {
        const tabStripItems = this.tabStrip && this.tabStrip.items;
        return tabStripItems ? tabStripItems.length : 0;
    }

    public eachChild(callback: (child: ViewBase) => boolean) {
        const tabStripItems = this.tabStrip && this.tabStrip.items;
        if (tabStripItems) {
            tabStripItems.forEach((item, i) => {
                callback(item);
            });
        }
    }

    public onItemsChanged(oldItems: TabContentItem[], newItems: TabContentItem[]): void {
        // BottomNavigationBar doesn't have items
    }
}
