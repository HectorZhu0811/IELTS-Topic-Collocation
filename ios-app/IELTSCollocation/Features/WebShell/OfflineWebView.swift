import SwiftUI
import WebKit

struct OfflineWebView: UIViewRepresentable {
    let reloadToken: UUID

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        loadTrainer(in: webView)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        guard context.coordinator.lastReloadToken != reloadToken else { return }
        context.coordinator.lastReloadToken = reloadToken
        loadTrainer(in: webView)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(reloadToken: reloadToken)
    }

    private func loadTrainer(in webView: WKWebView) {
        guard let fileURL = Bundle.main.url(
            forResource: "ielts-topic-collocation",
            withExtension: "html",
            subdirectory: "Web"
        ) else {
            webView.loadHTMLString(missingResourceHTML, baseURL: nil)
            return
        }

        webView.loadFileURL(fileURL, allowingReadAccessTo: fileURL.deletingLastPathComponent())
    }

    private var missingResourceHTML: String {
        """
        <!doctype html>
        <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <body style="font: -apple-system-body; padding: 24px;">
          <h1>Trainer file missing</h1>
          <p>The bundled IELTS collocation HTML was not found in the app resources.</p>
        </body>
        </html>
        """
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        var lastReloadToken: UUID

        init(reloadToken: UUID) {
            self.lastReloadToken = reloadToken
        }
    }
}
