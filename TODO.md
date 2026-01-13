وافق الحقول المتعلقة بـ Diagnosis / Warnings / Privacy (مشكلة فعلية تحتاج إصلاح)

وجدت عدم تناسق بالأسماء/البنى بين تعريفات النوع (src/types/index.ts) ومكوّن العرض (DiagnosisCard.tsx):

أ. تعريفات الأنواع (types):

في src/types/index.ts داخل OptimizerHistoryItem/diagnosis:

diagnosis?: {
  missingInfo?: string[];
  clarifyingQuestions?: string[];
  warnings?: string[];
};


— مرجع: 

index

في مكان آخر داخل OptimizerResponse.analysis يوجد حقل باسم privacyWarning?: string; (مختلف عن warnings و privacyWarnings) — مرجع: 

index

ب. مكوّن العرض (DiagnosisCard):

DiagnosisData في DiagnosisCard.tsx يعرف الحقول كالتالي:

export interface DiagnosisData {
  missingInfo?: MissingInfo[];
  clarifyingQuestions?: ClarifyingQuestion[];
  privacyWarnings?: string[];
  qualityScore?: number;
  assumptions?: string[];
}


— مرجع: 

DiagnosisCard

لاحقاً المكوّن يستخدم diagnosis.privacyWarnings و diagnosis.qualityScore فعلياً عند عرض الـ UI:

استخدام privacyWarnings: 

DiagnosisCard

استخدام qualityScore: 

DiagnosisCard

المشكلة: أسماء الحقول غير متطابقة بين types و components و الردّ من الخدمة:

types يستخدم warnings? و privacyWarning? (مفردة)،

DiagnosisCard يتوقع privacyWarnings? (جمع)،

OptimizerResponse.analysis قد يضع quality_score (snake_case) بينما الكود يقرأ qualityScore (camelCase).

الآثار: هذا قد يؤدي إلى أن DiagnosisCard لا يعرض تحذيرات الخصوصية أو الجودة لأن الحقول غير موحّدة/غير موجودة في الكائن الممرّر.

3) مقترحات إصلاح عملية (باتّباع القاعدة: ملف + سطر + snippet)

أنصح بإجراء تطبيع (normalization) لمحتوى الاستجابة فورَ قراءتها/تحليلها — أفضل مكان حالياً هو تحسين دالة parseOptimizerResponse في src/types/index.ts بحيث توحّد الأسماء (وهذا يمنع الحاجة لتغيير مكوّنات العرض).

الموقع الحالي للدالة: src/types/index.ts — دالة parseOptimizerResponse (السطور الأصلية): 

index

اقتراح تعديل للدالة ليقوم بالتطبيع (يمكن استبدال الدالة الحالية بهذه النسخة أو تعديلها كما تحب). الكود التالي يقوم بـ:

تحويل analysis.quality_score → analysis.qualityScore

تحويل diagnosis.warnings أو diagnosis.privacyWarning → diagnosis.privacyWarnings (كمصفوفة)

إن لم توجد diagnosis.qualityScore، يحاول تعبئتها من analysis.qualityScore أو analysis.quality_score

// ملف: src/types/index.ts
export function parseOptimizerResponse(
  response: unknown,
):
  | { success: true; data: OptimizerResponse }
  | { success: false; error: string } {
  try {
    const parsed = typeof response === 'string' ? JSON.parse(response) : response;
    const data = parsed as OptimizerResponse;

    // --- Normalize analysis quality_score -> qualityScore ---
    if ((data as any).analysis) {
      const analysis = (data as any).analysis;
      if (analysis.quality_score !== undefined && analysis.qualityScore === undefined) {
        analysis.qualityScore = analysis.quality_score;
      }
    }

    // --- Normalize diagnosis fields ---
    if ((data as any).diagnosis) {
      const diag = (data as any).diagnosis;

      // warnings  -> privacyWarnings (if applicable)
      if (diag.warnings && !diag.privacyWarnings) {
        diag.privacyWarnings = Array.isArray(diag.warnings) ? diag.warnings : [diag.warnings];
      }

      // privacyWarning (singular) -> privacyWarnings (array)
      if (diag.privacyWarning && !diag.privacyWarnings) {
        diag.privacyWarnings = Array.isArray(diag.privacyWarning)
          ? diag.privacyWarning
          : [diag.privacyWarning];
      }

      // If diagnosis lacks qualityScore, pull it from analysis (if exists)
      if (diag.qualityScore === undefined && (data as any).analysis) {
        const analysis = (data as any).analysis;
        diag.qualityScore = analysis.qualityScore ?? analysis.quality_score ?? undefined;
      }
    }

    return { success: true, data: data as OptimizerResponse };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse response',
    };
  }
}


ملاحظات تنفيذية:

التغيير أعلاه لا يكسر الأنواع (هو تطبيع بعد التحويل). بعد التطبيع، المكوّنات مثل DiagnosisCard ستحصل على diagnosis.privacyWarnings و diagnosis.qualityScore حسب توقعها.

إن رغبت، يمكن أيضاً توحيد الأسماء في تعريفات الـ types نفسها (مثلاً: diagnosis.privacyWarnings?: string[]; بدل warnings?) لكي يكون كل شيء موحّداً من الأصل. هذا سيجعل الـ IDE ونوعّات TypeScript تزودك بتحذيرات/إكمال تلقائي صحيح.

4) أمور إضافية لاحظتها الآن (ملاحظات سريعة)

OptimizerResponse.analysis يحتوي كلاً من qualityScore وquality_score (الاثنان موجودان كخيارات) — راجع: 

index


من الأفضل اختيار صيغة واحدة داخل المشروع (أنصح بـ camelCase: qualityScore) ثم تطبيع الـ snake_case عند الإدخال كما في الاقتراح أعلاه.

DiagnosisCard يستخدم privacyWarnings و assumptions بصورة متسقة داخل الواجهة، لذلك توحيد المصدر (types/حدث الخدمة) سيحل معظم المشاكل