import SwiftUI

struct LiquidGlassTopBar: View {
    let onReload: () -> Void

    var body: some View {
        if #available(iOS 26, *) {
            GlassEffectContainer(spacing: 12) {
                HStack(spacing: 12) {
                    titleBlock
                        .padding(.horizontal, 16)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .glassEffect(.regular.tint(.white.opacity(0.18)), in: .rect(cornerRadius: 24))

                    Button(action: onReload) {
                        Image(systemName: "arrow.clockwise")
                            .font(.system(size: 17, weight: .semibold))
                            .frame(width: 48, height: 48)
                    }
                    .buttonStyle(.glass)
                    .accessibilityLabel("Reload trainer")
                }
            }
        } else {
            HStack(spacing: 12) {
                titleBlock
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 24, style: .continuous))

                Button(action: onReload) {
                    Image(systemName: "arrow.clockwise")
                        .font(.system(size: 17, weight: .semibold))
                        .frame(width: 48, height: 48)
                }
                .buttonStyle(.bordered)
                .clipShape(Circle())
                .accessibilityLabel("Reload trainer")
            }
        }
    }

    private var titleBlock: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text("IELTS Collocation")
                .font(.headline.weight(.semibold))
                .foregroundStyle(.primary)

            Text("Offline trainer · Local HTML")
                .font(.caption.weight(.medium))
                .foregroundStyle(.secondary)
        }
        .lineLimit(1)
        .minimumScaleFactor(0.82)
    }
}

#Preview {
    ZStack {
        Color(.systemGroupedBackground)
            .ignoresSafeArea()

        VStack {
            LiquidGlassTopBar {}
        }
        .padding()
    }
}
