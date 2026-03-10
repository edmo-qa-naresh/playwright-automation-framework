import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import users from '../test-data/users.json';
import {EmailConfigPage} from '../pages/emailConfig';
import { ConsentPage } from '../pages/consentPage';
import { sendTestEmail } from '../utils/sendEmail';
import { DocumentTablePage } from '../pages/documentTable';
import { ReclassifyPopup } from '../pages/reclassifyPopup';
import { MatchStudentPopup } from '../pages/matchStudent';
test('Email → Document Processing Flow', async ({ context, page }) => {

    // Allow microphone permission automatically
  await context.grantPermissions(['microphone'], {
    origin: 'https://edm.test.technolutions.net'
  });
  const documentTable = new DocumentTablePage(page);
  const emailConfig = new EmailConfigPage(page);
  const loginPage = new LoginPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login(users.validUser.username, users.validUser.password);
 // Open email config page
  await emailConfig.openConfigPage();

  // Add Outlook email
  await emailConfig.addOutlookEmail("nareshkumar7570@outlook.com");
// loginto outlook and accept consent

  const consentPage = new ConsentPage(page);
  await consentPage.acceptPermission();
  // Send email from another account
  await sendTestEmail();

  // Wait until document appears
  await documentTable.waitForDocument("transcript.pdf");

  // Open document
  await documentTable.openDocument("transcript.pdf");

  // Reclassify popup
  await documentTable.clickReclassify();

  const reclassify = new ReclassifyPopup(page);
  await reclassify.selectDocumentType("Transcript");
  await reclassify.confirmReclassify();

  // Better match popup
  await documentTable.clickFindBetterMatch();

  const match = new MatchStudentPopup(page);
  await match.searchStudent("John Carter");
  await match.selectStudent("John Carter");
  await match.confirmMatch();

  // Sync document
  await documentTable.syncDocument();

  await expect(page.locator('text=Synced Successfully')).toBeVisible();

});