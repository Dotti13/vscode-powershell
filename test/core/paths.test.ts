// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { IPowerShellExtensionClient } from "../../src/features/ExternalApi";
import utils = require("../utils");

describe("Path assumptions", function () {
    let storageUri: vscode.Uri;
    before(async () => {
        const extension: IPowerShellExtensionClient = await utils.ensureEditorServicesIsConnected();
        storageUri = extension.getStorageUri();
    });

    // TODO: This is skipped because it interferes with other tests. Either
    // need to find a way to close the opened folder via a Code API, or find
    // another way to test this.
    it.skip("Opens the examples folder at the expected path", async function () {
        assert(await vscode.commands.executeCommand("PowerShell.OpenExamplesFolder"));
    });

    it("Creates the session folder at the correct path", function () {
        assert(fs.existsSync(path.resolve(utils.rootPath, "sessions")));
    });

    it("Creates the log folder at the correct path", function () {
        assert(fs.existsSync(vscode.Uri.joinPath(storageUri, "logs").fsPath));
    });
});
