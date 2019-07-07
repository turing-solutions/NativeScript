import { nsCapabilities, createDriver, AppiumDriver, Direction } from "nativescript-dev-appium";
import { BottomNavigationBasePage } from "./bottom-navigation-base-page";
import { ImageOptions } from "nativescript-dev-appium/lib/image-options";
import { Platform } from "mobile-devices-controller";
import { ElementCacheStrategy } from "../../../helpers/navigation-helper";
import { setImageName } from "../../../helpers/image-helper";
import { assert } from "chai";

const suite = "tab-navigation";
const spec = "bottom-navigation-css";

describe(`${suite}-${spec}-suite`, async function () {
    let driver: AppiumDriver;
    let bottomNavigationBasePage: BottomNavigationBasePage;

    const samples = [
        { sample: "tab-text-color: green;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "tab-background-color: yellow;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "selected-tab-text-color: red;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "android-selected-tab-highlight-color: orange;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "text-transform: uppercase;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "text-transform: lowercase;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "text-transform: capitalize;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "text-transform: none;", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "all", tab1: "IteM onE", tab2: "IteM twO" },
        { sample: "reset", tab1: "IteM onE", tab2: "IteM twO" },
    ];

    before(async function () {
        nsCapabilities.testReporter.context = this;
        driver = await createDriver();
        await driver.restartApp();
        bottomNavigationBasePage = new BottomNavigationBasePage(driver, ElementCacheStrategy.none);
        await bottomNavigationBasePage.init("css-text-transform");
        driver.imageHelper.options.keepOriginalImageSize = false;
        driver.imageHelper.options.donNotAppendActualSuffixOnIntialImageCapture = true;
    });

    after(async function () {
        await bottomNavigationBasePage.endSuite();
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
            await driver.restartApp();
            await bottomNavigationBasePage.initSuite();
        }
    });

    for (let index = 0; index < samples.length; index++) {
        const sample = samples[index];
        let imageName = `${spec}-${sample.sample.replace(/[^a-z]/ig, "-").replace(/(-+)/ig, "-").replace(/(_+)/ig, "_").replace(/-$/, "")}`;
        it(imageName, async function () {
            if (driver.platformName === Platform.ANDROID
                && (sample.sample.toLowerCase() === "all"
                    || sample.sample.toLowerCase() === "reset")) {
                await driver.scroll(Direction.down, 400, 200, 300, 200);
            }
            const scenarioBtn = await driver.waitForElement(sample.sample);
            await scenarioBtn.tap();
            imageName = setImageName(suite, spec, imageName);
            await driver.imageHelper.compareScreen({ imageName: imageName, timeOutSeconds: 5, tolerance: 0, toleranceType: ImageOptions.pixel });
            const tabTwo = await driver.waitForElement(sample.tab2);
            await tabTwo.click();
            await driver.imageHelper.compareScreen({ imageName: imageName, timeOutSeconds: 5 });

            const imageComparissonresult = driver.imageHelper.hasImageComparisonPassed();
            assert.isTrue(imageComparissonresult);

            if (imageComparissonresult) {
                const tabOne = await driver.waitForElement(sample.tab1);
                await tabOne.tap();
            }
        });
    }
});